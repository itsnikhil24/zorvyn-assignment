// src/data/dashboardData.js

export const transactions = [
  {
    id: 1,
    title: "Monthly salary",
    date: "2025-01-27",
    category: "Salary",
    amount: 5344,
    type: "income",
  },
  {
    id: 2,
    title: "Rent payment",
    date: "2025-01-29",
    category: "Housing",
    amount: 1200,
    type: "expense",
  },
  {
    id: 3,
    title: "Groceries",
    date: "2025-01-18",
    category: "Food",
    amount: 340,
    type: "expense",
  },
  {
    id: 4,
    title: "Monthly salary",
    date: "2025-02-27",
    category: "Salary",
    amount: 5344,
    type: "income",
  },
  {
    id: 5,
    title: "Travel insurance",
    date: "2025-02-26",
    category: "Travel",
    amount: 149,
    type: "expense",
  },
  {
    id: 6,
    title: "Electricity bill",
    date: "2025-02-20",
    category: "Bills & Utilities",
    amount: 180,
    type: "expense",
  },
  {
    id: 7,
    title: "Monthly salary",
    date: "2025-03-27",
    category: "Salary",
    amount: 5344,
    type: "income",
  },
  {
    id: 8,
    title: "Logo design",
    date: "2025-03-22",
    category: "Freelance",
    amount: 793,
    type: "income",
  },
  {
    id: 9,
    title: "Book purchase",
    date: "2025-03-20",
    category: "Education",
    amount: 225,
    type: "expense",
  },
  {
    id: 10,
    title: "Monthly salary",
    date: "2025-04-27",
    category: "Salary",
    amount: 5344,
    type: "income",
  },
  {
    id: 11,
    title: "Electronics",
    date: "2025-04-22",
    category: "Shopping",
    amount: 197,
    type: "expense",
  },
  {
    id: 12,
    title: "Home decor",
    date: "2025-05-18",
    category: "Shopping",
    amount: 303,
    type: "expense",
  },
  {
    id: 13,
    title: "Internet bill",
    date: "2025-05-10",
    category: "Bills & Utilities",
    amount: 147,
    type: "expense",
  },
  {
    id: 14,
    title: "Monthly salary",
    date: "2025-06-27",
    category: "Salary",
    amount: 5344,
    type: "income",
  },
  {
    id: 15,
    title: "Travel insurance",
    date: "2025-06-26",
    category: "Travel",
    amount: 149,
    type: "expense",
  },
  {
    id: 16,
    title: "Logo design",
    date: "2025-06-22",
    category: "Freelance",
    amount: 793,
    type: "income",
  },
  {
    id: 17,
    title: "Electronics",
    date: "2025-06-22",
    category: "Shopping",
    amount: 197,
    type: "expense",
  },
  {
    id: 18,
    title: "Book purchase",
    date: "2025-06-20",
    category: "Education",
    amount: 225,
    type: "expense",
  },
  {
    id: 19,
    title: "Home decor",
    date: "2025-06-18",
    category: "Shopping",
    amount: 303,
    type: "expense",
  },
  {
    id: 20,
    title: "Internet bill",
    date: "2025-06-10",
    category: "Bills & Utilities",
    amount: 147,
    type: "expense",
  },
];

const CATEGORY_COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#a855f7",
  "#f97316",
  "#84cc16",
  "#14b8a6",
  "#ef4444",
];

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatMonth = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
  }).format(date);

const monthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export function getDashboardStats(data) {
  const income = data
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = data
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expenses;

  return [
    {
      title: "Total Balance",
      value: formatCurrency(balance),
      tone: balance >= 0 ? "positive" : "negative",
    },
    {
      title: "Total Income",
      value: formatCurrency(income),
      tone: "positive",
    },
    {
      title: "Total Expenses",
      value: `-${formatCurrency(expenses).replace("$", "")}`,
      tone: "negative",
    },
  ];
}

export function getBalanceTrendData(data) {
  const monthlyMap = new Map();

  data.forEach((item) => {
    const date = new Date(item.date);
    const key = monthKey(date);

    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, {
        sortKey: key,
        month: formatMonth(date),
        income: 0,
        expense: 0,
      });
    }

    const entry = monthlyMap.get(key);
    entry[item.type] += item.amount;
  });

  return Array.from(monthlyMap.values()).sort((a, b) =>
    a.sortKey.localeCompare(b.sortKey)
  );
}

export function getSpendingBreakdownData(data) {
  const grouped = new Map();

  data
    .filter((item) => item.type === "expense")
    .forEach((item) => {
      grouped.set(item.category, (grouped.get(item.category) || 0) + item.amount);
    });

  const sorted = Array.from(grouped.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const topCategories = sorted.slice(0, 5);
  const rest = sorted.slice(5);

  const otherTotal = rest.reduce((sum, item) => sum + item.value, 0);

  const finalData = topCategories.map((item, index) => ({
    ...item,
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
  }));

  if (otherTotal > 0) {
    finalData.push({
      name: "Other",
      value: otherTotal,
      color: CATEGORY_COLORS[5],
    });
  }

  return finalData;
}

export function getInsightsData(data) {
  const expenseByCategory = new Map();

  const expenses = data.filter((item) => item.type === "expense");
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  expenses.forEach((item) => {
    expenseByCategory.set(
      item.category,
      (expenseByCategory.get(item.category) || 0) + item.amount
    );
  });

  const highestCategory =
    Array.from(expenseByCategory.entries()).sort((a, b) => b[1] - a[1])[0] || [];

  const latestMonth = getBalanceTrendData(data).at(-1);
  const previousMonth = getBalanceTrendData(data).at(-2);

  const monthlyChange =
    latestMonth && previousMonth
      ? latestMonth.expense - previousMonth.expense
      : 0;

  const avgTransaction =
    expenses.length > 0
      ? Math.round(expenses.reduce((sum, item) => sum + item.amount, 0) / expenses.length)
      : 0;

  return {
    highestSpending: {
      category: highestCategory[0] || "N/A",
      total: formatCurrency(highestCategory[1] || 0),
    },
    monthlyChange,
    avgTransaction: formatCurrency(avgTransaction),
  };
}

export function buildDashboardData(data = transactions) {
  return {
    stats: getDashboardStats(data),
    balanceTrendData: getBalanceTrendData(data),
    spendingBreakdownData: getSpendingBreakdownData(data),
    insightsData: getInsightsData(data),
    transactions: [...data].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    ),
  };
}