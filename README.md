# A Horror Visual Novel by NINTENDOGS

A horror visual novel clicker about college trauma, dreams, and survival. Built for Game Jam 2026.

## Members
*   Alleah Mae U. Sumile
*   Austin John M. Calcita
*   Denzel Gabriel M. Sarmiento
*   John David G. Romero
*   Mark Anthony D. Manzon

---

## Prerequisites
*   **Game Engine:** None required. This is an HTML5/JavaScript game built with the Phaser 3 framework.
*   **Tools:** Node.js (v14 or higher) and a modern web browser (Chrome, Firefox, Edge).
*   **Version Control:** Git installed.
*   **Package Manager:** npm (comes bundled with Node.js).

## Clone the Repository
1. Open your terminal or command prompt.
2. Run the following command to clone the project:
   ```bash
   git clone <your-repository-url>
   ```
*(Note: Git LFS is not required for this project, as all standard assets are managed via standard Git tracking.)*

## Open the Project
1. Open your preferred code editor (such as Visual Studio Code).
2. Select the root folder of the cloned repository (where the `package.json` and `index.html` files are located).

## Install Dependencies
The project uses a lightweight local server (`serve`) to run the game locally without CORS errors.
1. Open a terminal inside the project root folder.
2. Run the following command to download the required packages:
   ```bash
   npm install
   ```

## Project Configuration
*   **Settings:** No specific engine settings are required.
*   **Environment Variables:** None.
*   **API Keys:** None required.

## Run the Project
Because this is an HTML5 web game, it must be run on a local development server. 
1. In the terminal, start the local server by running:
   ```bash
   npm run dev
   ```
2. Open your web browser and navigate to `http://localhost:8080`.
3. The game will automatically launch starting with the **BootScene**, followed by the Title screen.
4. **Building for Release:** Since it is a purely client-side static web app, no complex build pipeline is required. Simply package the `index.html`, `src/`, `assets/`, and `audios/` folders and upload them to a host like itch.io or GitHub Pages.

## Folder Structure
*   `assets/` — Contains all visual assets like backgrounds, character portraits, and sprites.
*   `audios/` — Contains all sound effects (SFX) and background music (BGM).
*   `src/` — Contains all the JavaScript source code, divided into scenes (like `BootScene.js`, `MiniGameScene.js`) and configuration data (`config/`).

## Common Issues / Troubleshooting
*   **Game is stuck on a black screen / CORS errors:** This happens if you try to open `index.html` directly by double-clicking it. You *must* run `npm run dev` and open it through `localhost` to bypass browser security restrictions on loading local image/audio files.
*   **Missing Packages (`serve` not found):** Ensure you have run `npm install` before trying to run the local server.
*   **Missing Assets:** If images or audio fail to load, ensure the files were not corrupted during the clone process and check the browser console for exact missing file paths.

## Verification
If the setup was successful, you should expect the following:
*   Navigating to `http://localhost:8080` will load the Main Menu scene.
*   Clicking "Start" will transition into the game normally.
*   The browser's Developer Tools Console (F12) should show no missing asset or compile errors.
