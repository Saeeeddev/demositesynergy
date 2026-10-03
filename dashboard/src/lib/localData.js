import seed from '../../db.json';
import ahvazFinancial from '../assets/data/ahvazFinancial.json';

const STORAGE_KEY = 'site-synergy-dashboard-data-v1';

function readData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      const database = { ...seed, ...saved };
      if (database.user?.fullName === 'سعید دولتی') {
        database.user = { ...database.user, fullName: 'کاربر آزمایشی' };
      }
      if (database.user?.email === 'dolatisaeed6@gmail.com') {
        database.user = { ...database.user, email: 'demo@sitesynergy.local' };
      }
      return database;
    }
  } catch {
    // Invalid browser data must not stop the dashboard from opening.
  }
  return structuredClone(seed);
}

function getRecord(path, database) {
  const [collection, id] = path.split('/').filter(Boolean);
  const value = database[collection];
  if (value === undefined) throw new Error(`Unknown local data: ${collection}`);
  if (!id) return value;
  const record = Array.isArray(value) ? value.find((item) => String(item.id) === id) : value[id];
  if (record === undefined) throw new Error(`Record not found: ${path}`);
  return record;
}

export const api = {
  async get(url) {
    const parsed = new URL(url, window.location.origin);
    const database = readData();
    const detailedProjects = database.projects.filter((project) =>
      database.projectResults.some((result) => result.id === project.id && (result.basicInfo || result.status === 'pending'))
    );
    let data = getRecord(parsed.pathname, database);
    if (parsed.pathname === '/projects') data = detailedProjects;
    if (parsed.pathname.startsWith('/projectResults/')) {
      const project = database.projects.find((item) => item.id === data.id);
      data = {
        ...data,
        ...(data.id === 'proj-002' ? ahvazFinancial : {}),
        name: project?.name || data.projectInfo?.project_name,
        location: project?.location,
        clientName: project?.clientName,
      };
    }
    if (parsed.pathname === '/projectStats') {
      const projects = detailedProjects;
      const analyzedProjects = projects.filter((project) => project.status !== 'pending');
      data = {
        ...data,
        total: projects.length,
        pending: projects.filter((project) => project.status === 'pending').length,
        inProgress: projects.filter((project) => project.status === 'in-progress').length,
        completed: projects.filter((project) => project.status === 'completed').length,
        totalCapacity: projects.reduce((sum, project) => sum + (Number(project.capacity) || 0), 0),
        totalArea: projects.reduce((sum, project) => sum + (Number(project.area) || 0), 0),
        estimatedGeneration: analyzedProjects.reduce((sum, project) => sum + (Number(project.metrics?.estimatedGeneration) || (Number(project.capacity) || 0) * 1800), 0),
        avgROI: analyzedProjects.length ? analyzedProjects.reduce((sum, project) => sum + (Number(project.metrics?.roi) || 0), 0) / analyzedProjects.length : 0,
      };
    }
    if (Array.isArray(data)) {
      data = [...data];
      const sortBy = parsed.searchParams.get('_sort');
      if (sortBy) {
        const order = parsed.searchParams.get('_order') === 'desc' ? -1 : 1;
        data.sort((a, b) => String(a[sortBy] ?? '').localeCompare(String(b[sortBy] ?? ''), undefined, { numeric: true }) * order);
      }
      const limit = Number(parsed.searchParams.get('_limit'));
      if (limit > 0) data = data.slice(0, limit);
    }
    return { data: structuredClone(data) };
  },
  async post(url, value) {
    const parsed = new URL(url, window.location.origin);
    const collection = parsed.pathname.slice(1);
    const database = readData();
    if (!Array.isArray(database[collection])) throw new Error(`Unknown local collection: ${collection}`);
    database[collection].push(value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
    return { data: structuredClone(value) };
  },
  async createProject(project, result) {
    if (project.id !== result.id) throw new Error('Project and result IDs do not match');
    const database = readData();
    database.projects.push(project);
    database.projectResults.push(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
    return { data: structuredClone(project) };
  },
  async put(url, value) {
    const parsed = new URL(url, window.location.origin);
    const [collection, id] = parsed.pathname.split('/').filter(Boolean);
    const database = readData();
    if (!(collection in database)) throw new Error(`Unknown local data: ${collection}`);
    if (id && Array.isArray(database[collection])) {
      const index = database[collection].findIndex((item) => String(item.id) === id);
      if (index < 0) throw new Error(`Record not found: ${url}`);
      database[collection][index] = value;
    } else if (!id) {
      database[collection] = value;
    } else {
      throw new Error(`Record not found: ${url}`);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
    return { data: structuredClone(value) };
  },
};
