# 💸 Finance Dashboard UI

A clean and interactive Finance Dashboard built to visualize and manage financial data such as income, expenses, and transactions. This project focuses on frontend design, state management, and user experience.

# 🚀 Live Demo

https://zorvyn-assignment-ooq9.onrender.com


# 📦 Installation & Setup
 - Clone the repository
```bash  
git clone https://github.com/itsnikhil24/zorvyn-assignment.git 
```

 -  Navigate to project folder
```bash
cd zorvyn-assignment
 ``` 

 -  Install dependencies
```bash
npm install
   ``` 

 -  Run the app
```bash
npm run dev
   ``` 

# 📌 Features

- **🔐 Role-Based Access Control (RBAC)**
    * **Admin View**: Full access to manage financial data. Admins can add new transactions, edit existing ones, and delete records.
    * **Viewer View**: A read-only mode perfect for sharing financial status. Viewers can see all charts, insights, and tables, and export data, but cannot alter the underlying transactions.

- **🎨 Theming & UI**
    * **Dark & Light Mode**: Fully integrated theme toggling that adjusts all UI elements, charts, and table styles instantly for optimal viewing in any environment.

    * **Responsive Design**: A mobile-friendly layout that utilizes a hidden sidebar on smaller screens and adapts complex charts to fit any device width.

    * **Smooth Animations**: Incorporates fade-in animations and smooth color transitions to enhance the user experience when switching tabs or toggling themes.

- **📊 Dashboard Overview**


    * **Stat Cards**: At-a-glance summaries of your Total Balance, Total Income, Total Expenses, and Total Transactions. Features dynamic color-coding and trend icons (up/down arrows) based on positive or negative balances.

    * **Running Balance Trend**: An interactive line chart tracking your net balance over time to visualize financial growth or decline.

    * **Spending Breakdown**: A detailed pie chart summarizing expenses by category for the current period, complete with a color-coded legend.

    * **Recent Transactions**: A quick-view table showing the latest 5 transactions with a shortcut to the full transaction ledger.

- **💳 Transaction Management**


  * **Full CRUD Capabilities**: Add, edit, and delete transactions via an intuitive modal form (available to Admins).

  * **Smart Filtering**: Instantly filter records by Type (Income/Expense), Category (e.g., Housing, Food, Salary), or specific Months.
  
  * **Global Search**: Search through transaction descriptions in real-time.

  * **Multi-Column Sorting**: Sort the ledger ascending or descending by Date, Description, Category, Type, or Amount.

  * **Pagination**: Built-in pagination (10 items per page) to ensure smooth performance and easy navigation through large datasets.

  * **CSV Export**: A one-click download feature that exports your currently filtered transaction view into a structured .csv file for use in Excel or Google Sheets.

  # 🛠️ Tech Stack
   - Frontend: React (Vite)
   - Styling: Tailwind CSS
   - Icons: Lucide React
   - Charts: Recharts