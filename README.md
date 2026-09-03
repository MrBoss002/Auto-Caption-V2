<div align="center">

  # 🤖 MrBoss - Auto-Caption-V2

[![License: MIT](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Hosted-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**A modern, serverless Telegram channel management bot rebuilt for Vercel and MongoDB. Automatically format channel posts, apply custom captions, attach URL buttons, and manage multi-channel configurations with a live Web Dashboard.**

</div>

---

## ⚠️ Important Note Before Customizing

> **You MUST fork this repository first before editing any files or deploying!**  
> Do not attempt to modify this repository directly without forking it to your own GitHub account. Forking ensures you have full control over your code updates, environment variables, and automated Vercel deployments.

<div align="center">

  [![Fork Repository](https://img.shields.io/badge/1._Fork-This_Repo_First-10B981?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MrBoss002/Auto-Caption-V2/fork)

</div>

---

## ✨ Features

- **Channel Management:** Add, edit, and configure Telegram channels directly from private chat.
- **Caption Formatting:** Automatically append, prepend, or replace captions on new channel posts.
- **Auto Buttons & Media:** Attach custom URL buttons, stickers, or edit mode rules (media-only vs. all posts).
- **Interactive Commands:** Supports `/start`, `/help`, `/about`, `/channels`, `/add`, `/report`, `/cancel`, and admin `/stats`.
- **Mandatory-Join Gate:** Optional channel membership verification (`MUST_JOIN`) for users.
- **Web Dashboard:** Root web interface (`/`) displaying real-time metrics for posts processed, captions applied, active channels, and database health.

---

## 🛠️ Prerequisites

To run and deploy this bot yourself, you will need:
1. A **Telegram Bot Token** (Obtained from [@BotFather](https://t.me/BotFather)).
2. A **MongoDB Connection URI** (Free cluster via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).
3. A **Vercel Account** for serverless deployment.

---

## ⚙️ Environment Variables

Configure these variables in your Vercel Project Settings or local environment file:

| Variable Name | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `BOT_TOKEN` | Yes | Telegram Bot Token from @BotFather | `123456789:ABCdefGhI...` |
| `MONGODB_URI` | Yes | Connection string for MongoDB Atlas | `mongodb+srv://...` |
| `MONGODB_DB` | Yes | Database name inside MongoDB | `Auto_Caption` |
| `MUST_JOIN` | No | Mandatory channel username to join | `@MrBossTG` |
| `ADMIN_USER_ID` | No | Your Telegram user ID for `/stats` | `123456789` |
| `TELEGRAM_WEBHOOK_SECRET` | Yes | Webhook verification secret | `your_webhook_secret` |
| `BOT_SETUP_SECRET` | Yes | Secret header for `/api/telegram/setup` | `your_setup_secret` |
| `NEXT_PUBLIC_APP_URL` | Yes | Production URL hosted on Vercel | `https://your-app.vercel.app` |

---

## 🚀 Complete Step-by-Step Deployment Tutorial

Follow these steps in order to get your bot running on Vercel without errors.

### Step 1: Fork the Repository
Click the button below to fork the project into your own GitHub account:

<div align="center">

  [![Fork Repository](https://img.shields.io/badge/Fork-Repo_to_Your_Account-10B981?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MrBoss002/Auto-Caption-V2/fork)

</div>

<br />

### Step 2: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com/) and click **Add New > Project**.
2. Select your forked **`Auto-Caption-V2`** repository from GitHub.
3. In the **Environment Variables** section, add all required variables listed in the table above (`BOT_TOKEN`, `MONGODB_URI`, `MONGODB_DB`, `TELEGRAM_WEBHOOK_SECRET`, `BOT_SETUP_SECRET`, `NEXT_PUBLIC_APP_URL`).
4. Click **Deploy** and wait for the build to complete.

*(Alternatively, use the One-Click Deploy button below)*

<div align="center">

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMrBoss002%2FAuto-Caption-V2)

</div>

<br />

### Step 3: Initialize Webhook & Commands
Once your Vercel deployment completes, you must activate the Telegram Webhook so your bot can receive messages. Run the trigger command below in your terminal, or paste the setup URL in Postman/Talend API Tester:

| Action | Command / Request |
| :--- | :--- |
| **Initialize Webhook** | `curl -X POST https://YOUR-VERCEL-DOMAIN.vercel.app/api/telegram/setup -H "x-bot-setup-secret: YOUR_BOT_SETUP_SECRET"` |

> **Note:** Replace `YOUR-VERCEL-DOMAIN.vercel.app` with your actual Vercel app domain, and replace `YOUR_BOT_SETUP_SECRET` with the exact secret key you set in your Vercel Environment Variables.

---

## ☕ Support & Community

<div align="center">

If this project saved you time or helped manage your Telegram channels, consider supporting the developer!

| ☕ Support Developer | 🌐 Official Channel | ⛑ Need Assistance |
| :---: | :---: | :---: |
| [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/MrBoss002) | [![Powered By](https://img.shields.io/badge/Powered%20By-%40MrBossTG-FF0055?style=for-the-badge&logo=telegram&logoColor=blue)](https://t.me/MrBossTG) | [![Dev Help](https://img.shields.io/badge/Contact-Developer-229ED9?style=for-the-badge&logo=telegram&logoColor=blue)](https://t.me/ZeroTwoCare) |

<br />

[![Developed By](https://img.shields.io/badge/Developed%20By-%40MrBoss002-00C853?style=flat-square&logo=github)](https://github.com/MrBoss002)

**Auto-Caption-V2** • Built with ❤️ for Telegram content creators.

</div>
