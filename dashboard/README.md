# Site Synergy dashboard

Run `npm install` and `npm run dev`, then open the Vite URL. No JSON Server is needed.

The app opens at `/login`. During the update, only the demo login is available: phone `09123456789` and password `demo1234`. Registration is paused. The checked-in `db.json` supplies initial dashboard data. Profile edits and locally created records are saved in this browser's local storage. The login session is saved in session storage.

This is a browser-only demo, not secure authentication or shared storage. Local data are available only in the browser where they were created. Clearing site storage resets them. Password reset by SMS is unavailable without a backend. Map tiles and location search still require internet access. The project detail pages display the satellite base map and list the available layers; selecting a layer shows a notice because analytic overlays are disabled in this demo. Financial pages identify their figures as sample data. The Ahvaz project's financial figures in `src/assets/data/ahvazFinancial.json` are illustrative sample values, not validated estimates. New projects save their inputs locally and remain pending until analysis results are supplied.

Use `npm run build` to verify the production bundle.
