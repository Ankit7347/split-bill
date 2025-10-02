
---

# ⚡ Next.js + Tailwind + shadcn/ui Setup Guide (Ubuntu)

## 1. Install Node.js with NVM

```bash
# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh

# Install Node.js (latest stable)
nvm install 22

# Verify installation
node -v
npm -v
```

---

## 2. Create a New Next.js App

```bash
# Create a new Next.js project (replace `my-app` with your project name)
npx create-next-app@latest my-app

# Go into project folder
cd my-app
```

---

## 3. Install Tailwind CSS

```bash
# Install TailwindCSS + PostCSS + Autoprefixer
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind config
npx tailwindcss init -p
```

---

## 4. Setup shadcn/ui

### Install dependencies

```bash
npm install @radix-ui/react-icons class-variance-authority tailwind-variants tailwindcss-animate
```

### Initialize shadcn/ui

```bash
npx shadcn@latest init
```

👉 This creates a `components` directory where shadcn UI components will live.

---

## 5. Add shadcn/ui Components

You can add individual components. Examples:

```bash
# Buttons
npx shadcn@latest add button

# Cards
npx shadcn@latest add card

# Input fields
npx shadcn@latest add input

# Avatars
npx shadcn@latest add avatar

# Dialogs
npx shadcn@latest add dialog

# Dropdown Menu
npx shadcn@latest add dropdown-menu

# Menubar
npx shadcn@latest add menubar

# Navigation Menu
npx shadcn@latest add navigation-menu

# Select
npx shadcn@latest add select

# Tabs
npx shadcn@latest add tabs

# Toast (notifications)
npx shadcn@latest add toast

# Tooltip
npx shadcn@latest add tooltip
```

👉 You can add as many as you need.

---

## 6. Run the App

```bash
npm run dev
```

Then open 👉 `http://localhost:3000`

---