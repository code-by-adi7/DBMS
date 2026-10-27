// Comprehensive DBMS Lab Curriculum Dataset (All 14 Programs from Final Record PDF)
const DBMS_PROGRAMS = [
  {
    "id": "A1",
    "part": "Part A (SQL)",
    "progNum": 1,
    "title": "Employee Table & Search Queries",
    "icon": "users",
    "description": "Create EMPLOYEE table with constraints (Primary Key, CHECK, NOT NULL). Search using LIKE, BETWEEN, DISTINCT, and departmental aggregation with GROUP BY & HAVING.",
    "tables": [
      {
        "name": "EMPLOYEE",
        "columns": "EMPNO (PK), NAME, DESIGNATION, DEPARTMENT, GENDER, SALARY",
        "createSql": "CREATE TABLE employee (\n  empno NUMBER(10) PRIMARY KEY,\n  name VARCHAR2(20) NOT NULL,\n  designation VARCHAR2(20) NOT NULL,\n  CHECK (designation IN ('CLERK','ANALYST','MANAGER','ACCOUNTANT','SUPERVISOR')),\n  department VARCHAR2(20) NOT NULL,\n  CHECK (department IN ('SALES','ACCOUNTS','IT')),\n  gender CHAR(1) CHECK (gender IN ('M','F')),\n  salary NUMBER(10,4)\n);",
        "insertSql": "INSERT INTO employee VALUES (101, 'arun raj', 'manager', 'sales', 'm', 55000);\nINSERT INTO employee VALUES (102, 'priya', 'clerk', 'accounts', 'f', 25000);\nINSERT INTO employee VALUES (103, 'kiran raj', 'analyst', 'it', 'm', 42000);\nINSERT INTO employee VALUES (104, 'sneha', 'accountant', 'accounts', 'f', 32000);\nINSERT INTO employee VALUES (105, 'vijay raj', 'clerk', 'sales', 'm', 22000);\nINSERT INTO employee VALUES (106, 'anita', 'analyst', 'it', 'f', 38000);\nINSERT INTO employee VALUES (107, 'mohan', 'supervisor', 'sales', 'm', 28000);",
        "sampleRecords": [
          {
            "EMPNO": 101,
            "NAME": "arun raj",
            "DESIGNATION": "manager",
            "DEPARTMENT": "sales",
            "GENDER": "m",
            "SALARY": 55000
          },
          {
            "EMPNO": 102,
            "NAME": "priya",
            "DESIGNATION": "clerk",
            "DEPARTMENT": "accounts",
            "GENDER": "f",
            "SALARY": 25000
          },
          {
            "EMPNO": 103,
            "NAME": "kiran raj",
            "DESIGNATION": "analyst",
            "DEPARTMENT": "it",
            "GENDER": "m",
            "SALARY": 42000
          },
          {
            "EMPNO": 104,
            "NAME": "sneha",
            "DESIGNATION": "accountant",
            "DEPARTMENT": "accounts",
            "GENDER": "f",
            "SALARY": 32000
          },
          {
            "EMPNO": 105,
            "NAME": "vijay raj",
            "DESIGNATION": "clerk",
            "DEPARTMENT": "sales",
            "GENDER": "m",
            "SALARY": 22000
          },
          {
            "EMPNO": 106,
            "NAME": "anita",
            "DESIGNATION": "analyst",
            "DEPARTMENT": "it",
            "GENDER": "f",
            "SALARY": 38000
          },
          {
            "EMPNO": 107,
            "NAME": "mohan",
            "DESIGNATION": "supervisor",
            "DEPARTMENT": "sales",
            "GENDER": "m",
            "SALARY": 28000
          }
        ]
      }
    ],
    "queries": [
      {
        "id": "q1",
        "label": "Query (a)",
        "question": "Display empno, name and designation of all employees whose name ends with RAJ.",
        "sql": "SELECT empno, name, designation FROM employee WHERE name LIKE '%Raj';",
        "explanation": "The wildcard % represents zero or more characters preceding 'Raj'. Matches 'arun raj', 'kiran raj', 'vijay raj'.",
        "keyPoints": [
          "LIKE '%Raj' searches for suffix",
          "% matches any character sequence",
          "Case-sensitive in standard Oracle"
        ],
        "output": "EMPNO: 101, 103, 105"
      },
      {
        "id": "q2",
        "label": "Query (b)",
        "question": "Display the details of all female employees earning salary within 20000 to 40000 in Sales or IT departments.",
        "sql": "SELECT * FROM employee WHERE gender='f' AND salary BETWEEN 20000 AND 40000 AND department IN ('sales','it');",
        "explanation": "Combines GENDER filter, BETWEEN range comparison, and IN set membership with AND logical conjunction.",
        "keyPoints": [
          "BETWEEN is inclusive (20000 and 40000 are included)",
          "IN ('sales','it') is equivalent to department='sales' OR department='it'"
        ],
        "output": "Returns Priya (Accounts excluded), Anita (IT, 38000)"
      },
      {
        "id": "q3",
        "label": "Query (c)",
        "question": "List the different departments with designations in that department.",
        "sql": "SELECT DISTINCT department, designation FROM employee;",
        "explanation": "DISTINCT eliminates duplicate pairs of (department, designation) so each combination appears only once.",
        "keyPoints": [
          "Applies to the combination of all selected columns",
          "Prevents redundant department-designation pairings"
        ],
        "output": "Unique pairs: sales/manager, accounts/clerk, it/analyst, accounts/accountant, sales/clerk, sales/supervisor"
      },
      {
        "id": "q4",
        "label": "Query (d)",
        "question": "Display department name, total, average, maximum, and minimum salary where total salary exceeds 30000.",
        "sql": "SELECT department, sum(salary) total, avg(salary) average, max(salary) maximum, min(salary) minimum FROM employee GROUP BY department HAVING sum(salary) > 30000;",
        "explanation": "GROUP BY aggregates rows by department, then aggregate functions compute statistics. HAVING filters out departments whose total salary is <= 30000.",
        "keyPoints": [
          "WHERE cannot filter aggregates like SUM(); HAVING is required",
          "Column aliases total, average, max, min format the header"
        ],
        "output": "sales: total 105000; it: total 80000; accounts: total 57000"
      },
      {
        "id": "q5",
        "label": "Query (e)",
        "question": "List the departments which have more than two employees.",
        "sql": "SELECT department FROM employee GROUP BY department HAVING count(*) > 2;",
        "explanation": "COUNT(*) calculates number of rows in each department group. HAVING count(*) > 2 filters only groups with 3 or more members.",
        "keyPoints": [
          "COUNT(*) counts all rows in the group",
          "Only departments having > 2 employees are returned (e.g. sales)"
        ],
        "output": "DEPARTMENT: sales"
      }
    ],
    "memoryTip": "WHERE filters people BEFORE they enter the club. HAVING filters the buckets AFTER they group up.",
    "vivaQuestions": [
      {
        "q": "What is the primary difference between WHERE and HAVING clause?",
        "a": "WHERE filters individual records before grouping occurs and cannot accept aggregate functions. HAVING filters entire groups after GROUP BY and evaluates aggregate expressions (SUM, COUNT, AVG)."
      },
      {
        "q": "What does LIKE '%Raj' do versus LIKE '_Raj'?",
        "a": "% matches zero or more characters of any length. Underscore (_) matches exactly one single character."
      },
      {
        "q": "What is the purpose of the CHECK constraint in CREATE TABLE?",
        "a": "CHECK constraint enforces domain integrity by ensuring attribute values satisfy a specified boolean condition (e.g., gender IN ('M','F') or designation IN ('CLERK', ...))."
      }
    ]
  },
  {
    "id": "A2",
    "part": "Part A (SQL)",
    "progNum": 2,
    "title": "Client Table Surgery (CTAS, Structure Clone & DDL)",
    "icon": "edit",
    "description": "Create CLIENT table with CHECK constraint. Create clone tables using CREATE TABLE AS SELECT (CTAS), empty structure clone using WHERE 1=2, add columns with ALTER, conditional UPDATE with IN, RENAME, and DROP.",
    "tables": [
      {
        "name": "CLIENT",
        "columns": "CLIENT_NO (PK), NAME, ADDRESS, STATE, BAL_DUE",
        "createSql": "CREATE TABLE client (\n  client_no VARCHAR2(10) CONSTRAINT client_pk PRIMARY KEY,\n  name VARCHAR2(30) NOT NULL,\n  address VARCHAR2(50),\n  state VARCHAR2(20) NOT NULL,\n  bal_due NUMBER(10,2) NOT NULL,\n  CONSTRAINT chk_client_no CHECK (client_no LIKE 'C%')\n);",
        "insertSql": "INSERT INTO client VALUES ('C1001', 'Rahul Sharma', 'Bangalore', 'Karnataka', 12000.00);\nINSERT INTO client VALUES ('C1002', 'Anita Rao', 'Mangalore', 'Karnataka', 8500.00);\nINSERT INTO client VALUES ('C1003', 'Vikram Singh', 'Mumbai', 'Maharashtra', 15000.00);\nINSERT INTO client VALUES ('C1004', 'Pooja Nair', 'Chennai', 'Tamil Nadu', 9000.00);\nINSERT INTO client VALUES ('C1005', 'Karthik Gowda', 'Mysore', 'Karnataka', 6000.00);",
        "sampleRecords": [
          {
            "CLIENT_NO": "C1001",
            "NAME": "Rahul Sharma",
            "STATE": "Karnataka",
            "BAL_DUE": 12000.0
          },
          {
            "CLIENT_NO": "C1002",
            "NAME": "Anita Rao",
            "STATE": "Karnataka",
            "BAL_DUE": 8500.0
          },
          {
            "CLIENT_NO": "C1003",
            "NAME": "Vikram Singh",
            "STATE": "Maharashtra",
            "BAL_DUE": 15000.0
          },
          {
            "CLIENT_NO": "C1004",
            "NAME": "Pooja Nair",
            "STATE": "Tamil Nadu",
            "BAL_DUE": 9000.0
          },
          {
            "CLIENT_NO": "C1005",
            "NAME": "Karthik Gowda",
            "STATE": "Karnataka",
            "BAL_DUE": 6000.0
          }
        ]
      }
    ],
    "queries": [
      {
        "id": "q1",
        "label": "Query (a)",
        "question": "Create a new table CLIENT1 containing only CLIENT_NO and BAL_DUE for a state accepted at runtime.",
        "sql": "CREATE TABLE client1 AS SELECT client_no, bal_due FROM client WHERE state = '&state';",
        "explanation": "CTAS (CREATE TABLE AS SELECT) creates a new physical table pre-populated with query results. &state prompts for user input at execution time in SQL*Plus.",
        "keyPoints": [
          "CTAS copies column definitions and selected rows",
          "Substitution variable &state prompts user during execution"
        ],
        "output": "Table CLIENT1 created with matching records"
      },
      {
        "id": "q2",
        "label": "Query (b)",
        "question": "Create table CLIENT2 having the identical structure as CLIENT but with no records (empty clone).",
        "sql": "CREATE TABLE client2 AS SELECT * FROM client WHERE 1=2;",
        "explanation": "Since 1=2 is always FALSE, zero rows qualify for insertion, but the database engine duplicates the schema structure.",
        "keyPoints": [
          "WHERE 1=2 is an impossible predicate",
          "Creates an identical schema clone without copying records"
        ],
        "output": "Table created with 0 rows"
      },
      {
        "id": "q3",
        "label": "Query (c)",
        "question": "Add a new column PENALTY NUMBER(10,2) to table CLIENT.",
        "sql": "ALTER TABLE client ADD penalty NUMBER(10,2);",
        "explanation": "ALTER TABLE modifies the table structure. ADD appends the new column PENALTY with initial NULL values.",
        "keyPoints": [
          "ALTER TABLE is DDL (Data Definition Language)",
          "Newly added columns initially contain NULL values"
        ],
        "output": "Table altered"
      },
      {
        "id": "q4",
        "label": "Query (d)",
        "question": "Assign Penalty as 10% of BAL_DUE for clients C1002, C1005, C1009 and 8% for others.",
        "sql": "UPDATE client SET penalty = bal_due * 0.10 WHERE client_no IN ('C1002','C1005','C1009');\nUPDATE client SET penalty = bal_due * 0.08 WHERE client_no NOT IN ('C1002','C1005','C1009');",
        "explanation": "Performs conditional mathematical updates based on set membership using IN and NOT IN predicates.",
        "keyPoints": [
          "UPDATE modifies data rows without altering structure",
          "IN tests membership in a discrete set of values"
        ],
        "output": "Rows updated with calculated penalty amounts"
      },
      {
        "id": "q5",
        "label": "Query (e)",
        "question": "Rename CLIENT1 to NEW_CLIENT.",
        "sql": "RENAME client1 TO new_client;",
        "explanation": "RENAME command safely updates the table metadata entry in Oracle data dictionary.",
        "keyPoints": [
          "RENAME is an Oracle DDL statement",
          "Preserves table schema and rows under the new identifier"
        ],
        "output": "Table renamed"
      },
      {
        "id": "q6",
        "label": "Query (f)",
        "question": "Delete the table CLIENT2.",
        "sql": "DROP TABLE client2;",
        "explanation": "DROP TABLE permanently deletes the table structure, data, and associated indexes from the database.",
        "keyPoints": [
          "DROP TABLE cannot be undone with ROLLBACK",
          "Removes table from the schema completely"
        ],
        "output": "Table dropped"
      }
    ],
    "memoryTip": "ALTER modifies the Box. UPDATE modifies the Toys inside. DROP throws the box into the incinerator.",
    "vivaQuestions": [
      {
        "q": "How does 'WHERE 1=2' create an empty table copy?",
        "a": "Because 1=2 evaluates to FALSE for every record, zero rows are fetched from the source table. However, the database compiler inspects the query metadata and recreates identical column definitions."
      },
      {
        "q": "What is the difference between DELETE, TRUNCATE, and DROP?",
        "a": "DELETE is a DML statement that removes specific rows and can be rolled back. TRUNCATE is a DDL statement that removes all rows instantly without logging individual row deletions. DROP deletes both the rows and the table structure."
      }
    ]
  },
  {
    "id": "A3",
    "part": "Part A (SQL)",
    "progNum": 3,
    "title": "Book Library Records & String Filtering",
    "icon": "book-open",
    "description": "Create BOOK table. Queries feature single-character underscore wildcard (_), descending sorting with ORDER BY DESC, ALTER TABLE MODIFY to expand column width, NOT IN, and row deletion with DELETE.",
    "tables": [
      {
        "name": "BOOK",
        "columns": "ACCESSIONNO (PK), TITLE, AUTHOR, PUBLISHER, YEAR, PRICE",
        "createSql": "CREATE TABLE book (\n  accessionno NUMBER(20) PRIMARY KEY,\n  title VARCHAR2(20) NOT NULL,\n  author VARCHAR2(20) NOT NULL,\n  publisher VARCHAR2(20) NOT NULL,\n  year NUMBER(4) NOT NULL,\n  price NUMBER(10,2) NOT NULL\n);",
        "insertSql": "INSERT INTO book VALUES (1000, 'Java Fundamentals', 'Herbert Schildt', 'McGraw Hill', 2018, 650);\nINSERT INTO book VALUES (1001, 'Programming in C', 'E Balaguruswamy', 'Tata McGraw', 2015, 450);\nINSERT INTO book VALUES (1002, 'DBMS Concepts', 'Navathe', 'Pearson', 2008, 720);\nINSERT INTO book VALUES (1003, 'Operating Systems', 'Silberschatz', 'Wiley', 2005, 580);\nINSERT INTO book VALUES (1004, 'Classic Algorithms', 'Knuth', 'Addison', 1988, 900);",
        "sampleRecords": [
          {
            "ACCESSIONNO": 1000,
            "TITLE": "Java Fundamentals",
            "AUTHOR": "Herbert Schildt",
            "PUBLISHER": "McGraw Hill",
            "YEAR": 2018,
            "PRICE": 650
          },
          {
            "ACCESSIONNO": 1002,
            "TITLE": "DBMS Concepts",
            "AUTHOR": "Navathe",
            "PUBLISHER": "Pearson",
            "YEAR": 2008,
            "PRICE": 720
          },
          {
            "ACCESSIONNO": 1004,
            "TITLE": "Classic Algorithms",
            "AUTHOR": "Knuth",
            "PUBLISHER": "Addison",
            "YEAR": 1988,
            "PRICE": 900
          }
        ]
      }
    ],
    "queries": [
      {
        "id": "q1",
        "label": "Query (a)",
        "question": "List the details of publishers having 'a' as the second character in their names.",
        "sql": "SELECT * FROM book WHERE publisher LIKE '_a%';",
        "explanation": "The underscore (_) matches exactly one arbitrary character in the first position, followed immediately by 'a', and % matches any remaining characters.",
        "keyPoints": [
          "Underscore (_) matches exactly 1 character",
          "% matches 0 or more characters",
          "Together '_a%' targets 'Tata', 'Navathe', 'Pearson'"
        ],
        "output": "Tata McGraw, Pearson records"
      },
      {
        "id": "q2",
        "label": "Query (b)",
        "question": "Display Accession No., TITLE, PUBLISHER and YEAR of books published by Navathe before 2010 in descending order of YEAR.",
        "sql": "SELECT accessionno, title, publisher, year FROM book WHERE author='Navathe' AND year < 2010 ORDER BY year DESC;",
        "explanation": "Combines equality comparison on AUTHOR, less-than comparison on YEAR, and orders output newest to oldest via DESC.",
        "keyPoints": [
          "ORDER BY year DESC sorts highest year to lowest",
          "Default ordering without DESC is ASC (ascending)"
        ],
        "output": "Acc: 1002, DBMS Concepts, Pearson, 2008"
      },
      {
        "id": "q3",
        "label": "Query (c)",
        "question": "Modify the size of TITLE column to increase the size by 5 characters.",
        "sql": "ALTER TABLE book MODIFY title VARCHAR2(25);",
        "explanation": "ALTER TABLE with MODIFY changes existing column definitions (from VARCHAR2(20) to VARCHAR2(25)).",
        "keyPoints": [
          "Increasing column length is always permissible even if table contains data",
          "Decreasing size requires existing values to fit into the smaller width"
        ],
        "output": "Table altered"
      },
      {
        "id": "q4",
        "label": "Query (d)",
        "question": "Display details of all books other than Microsoft Press publishers.",
        "sql": "SELECT * FROM book WHERE publisher NOT IN ('Microsoft Press');",
        "explanation": "NOT IN excludes rows matching any element within the provided list.",
        "keyPoints": [
          "Can also be written as publisher <> 'Microsoft Press'",
          "Safely handles exclusions"
        ],
        "output": "All books published by Tata, Pearson, Wiley, McGraw Hill"
      },
      {
        "id": "q5",
        "label": "Query (e)",
        "question": "Remove the records of the books published before 1990.",
        "sql": "DELETE FROM book WHERE year < 1990;",
        "explanation": "DELETE FROM with a WHERE predicate removes all rows where the publication year is strictly prior to 1990.",
        "keyPoints": [
          "DELETE only removes rows, preserving table schema",
          "Can be committed or rolled back in transactional sessions"
        ],
        "output": "Rows published < 1990 deleted"
      }
    ],
    "memoryTip": "Underscore (_) is a sniper that shoots exactly one character. Percent (%) is a shotgun that sprays everything else.",
    "vivaQuestions": [
      {
        "q": "What is the distinction between % and _ in pattern matching?",
        "a": "The percentage symbol (%) matches zero, one, or multiple characters. The underscore (_) is a positional wild card that matches exactly one single character."
      },
      {
        "q": "Can you use ALTER TABLE MODIFY to reduce the size of a column that already has data?",
        "a": "You can only reduce the column size if the existing data in that column for all rows does not exceed the new specified length; otherwise Oracle raises an error."
      }
    ]
  },
  {
    "id": "A4",
    "part": "Part A (SQL)",
    "progNum": 4,
    "title": "Sales Team Hierarchy (Self-Join & Date Math)",
    "icon": "git-compare",
    "description": "Create SALES table with CHECK constraint on age (>= 18) and DEFAULT commission 0. Features Subquery, Self-Join to compare employees with their managers, and date arithmetic with TRUNC & MONTHS_BETWEEN.",
    "tables": [
      {
        "name": "SALES",
        "columns": "SNO (PK), SNAME, MANAGER_NAME, JOIN_DATE, DATE_BIRTH, SALARY, SALES_AMOUNT, COMMISSION",
        "createSql": "CREATE TABLE sales (\n  sno NUMBER(10) PRIMARY KEY,\n  sname VARCHAR2(20) NOT NULL,\n  manager_name VARCHAR2(20),\n  join_date DATE NOT NULL,\n  date_birth DATE NOT NULL,\n  salary NUMBER(10) NOT NULL,\n  sales_amount NUMBER(10) NOT NULL,\n  commission NUMBER DEFAULT 0,\n  CONSTRAINT chk_age CHECK (TRUNC(MONTHS_BETWEEN(join_date, date_birth)/12) >= 18)\n);",
        "insertSql": "INSERT INTO sales VALUES (101, 'Lakshmi', 'Suresh', '15-aug-11', '22-jan-86', 29000, 65000, 0);\nINSERT INTO sales VALUES (102, 'Suresh', 'Jyothi', '01-jan-10', '01-feb-80', 20000, 50000, 0);\nINSERT INTO sales VALUES (103, 'Jyothi', NULL, '10-mar-05', '14-apr-75', 45000, 80000, 0);\nINSERT INTO sales VALUES (104, 'Ramesh', 'Suresh', '20-jul-12', '18-sep-88', 26000, 70000, 0);",
        "sampleRecords": [
          {
            "SNO": 101,
            "SNAME": "Lakshmi",
            "MANAGER_NAME": "Suresh",
            "SALARY": 29000,
            "COMMISSION": 13000
          },
          {
            "SNO": 102,
            "SNAME": "Suresh",
            "MANAGER_NAME": "Jyothi",
            "SALARY": 20000,
            "COMMISSION": 10000
          },
          {
            "SNO": 103,
            "SNAME": "Jyothi",
            "MANAGER_NAME": "NULL",
            "SALARY": 45000,
            "COMMISSION": 16000
          }
        ]
      }
    ],
    "queries": [
      {
        "id": "q1",
        "label": "Query (a)",
        "question": "Display details of sales persons whose salary is more than the average salary in the company.",
        "sql": "SELECT * FROM sales WHERE salary > (SELECT avg(salary) FROM sales);",
        "explanation": "A scalar subquery (SELECT avg(salary) FROM sales) executes first to determine the company-wide average. The outer query compares each employee's salary against that computed scalar.",
        "keyPoints": [
          "Inner subquery computes the company benchmark",
          "Outer query filters rows exceeding the benchmark"
        ],
        "output": "Employees with salary above average"
      },
      {
        "id": "q2",
        "label": "Query (b)",
        "question": "Update commission as 20% of Sales Amount.",
        "sql": "UPDATE sales SET commission = (sales_amount * 0.20);",
        "explanation": "Computes arithmetic expression (sales_amount * 0.20) and writes result into the commission column across all records.",
        "keyPoints": [
          "Updates existing records in place",
          "Computes derived commission percentage"
        ],
        "output": "Rows updated"
      },
      {
        "id": "q3",
        "label": "Query (c)",
        "question": "Display SNO, SNAME, MANAGER_NAME, SALARY, COMMISSION where total earnings (salary + commission) exceed the manager's salary (Self-Join).",
        "sql": "SELECT s.sno, s.sname, s.manager_name, s.salary, s.commission, m.salary AS manager_salary\nFROM sales s JOIN sales m\nON s.manager_name = m.sname\nWHERE (s.salary + s.commission) > m.salary;",
        "explanation": "A Self-Join pairs the table with itself. Alias 's' represents subordinate sales reps, alias 'm' represents managers. ON matches s.manager_name to m.sname.",
        "keyPoints": [
          "Self-join requires two distinct aliases for the same table",
          "ON s.manager_name = m.sname creates the supervisor link",
          "WHERE compares combined subordinate pay against manager salary"
        ],
        "output": "Lakshmi (salary 29000 + 13000 commission = 42000 > Suresh's 20000)"
      },
      {
        "id": "q4",
        "label": "Query (d)",
        "question": "Display records of employees who finished the service of 10 years.",
        "sql": "SELECT * FROM sales WHERE TRUNC(MONTHS_BETWEEN(sysdate, join_date)/12) >= 10;",
        "explanation": "MONTHS_BETWEEN(sysdate, join_date)/12 calculates service duration in years. TRUNC truncates to integer years, and >= 10 verifies tenure.",
        "keyPoints": [
          "SYSDATE yields current database server date",
          "MONTHS_BETWEEN computes elapsed months between two timestamps",
          "TRUNC discards partial fractional years without rounding"
        ],
        "output": "Employees with 10+ completed years of service"
      }
    ],
    "memoryTip": "A Self-Join is like looking into a mirror. You are 's', the reflection is 'm', and the ON clause is the gaze between them.",
    "vivaQuestions": [
      {
        "q": "What is a Self-Join and why are table aliases mandatory?",
        "a": "A Self-Join joins a table to itself. Table aliases (like s and m) are mandatory because they allow the SQL engine to distinguish whether column references belong to the left or right instance of the same table."
      },
      {
        "q": "What is the difference between ROUND and TRUNC in date/number functions?",
        "a": "ROUND rounds numbers or dates up/down based on standard mathematical thresholds (.5). TRUNC chops off decimal places or fractional parts directly without rounding."
      }
    ]
  },
  {
    "id": "A5",
    "part": "Part A (SQL)",
    "progNum": 5,
    "title": "Sales Performance (Composite Keys & Subqueries)",
    "icon": "target",
    "description": "Create SALES_DETAILS table with Composite Primary Key (SNO, MONTH). Subqueries identify reps who achieved targets and those who NEVER reached their target using NOT IN.",
    "tables": [
      {
        "name": "SALES_DETAILS",
        "columns": "SNO, MONTH, TARGET, QTY_SOLD (Composite PK: SNO + MONTH)",
        "createSql": "CREATE TABLE sales_details (\n  sno VARCHAR2(10),\n  month VARCHAR2(10),\n  target NUMBER(10) CHECK (target > 0),\n  qty_sold NUMBER(10) CHECK (qty_sold > 0),\n  PRIMARY KEY (sno, month)\n);",
        "insertSql": "INSERT INTO sales_details VALUES ('s0001', 'dec', 60, 60);\nINSERT INTO sales_details VALUES ('s0002', 'feb', 50, 70);\nINSERT INTO sales_details VALUES ('s0003', 'mar', 80, 45);\nINSERT INTO sales_details VALUES ('s0004', 'apr', 90, 85);\nINSERT INTO sales_details VALUES ('s0005', 'nov', 100, 120);",
        "sampleRecords": [
          {
            "SNO": "s0001",
            "MONTH": "dec",
            "TARGET": 60,
            "QTY_SOLD": 60
          },
          {
            "SNO": "s0002",
            "MONTH": "feb",
            "TARGET": 50,
            "QTY_SOLD": 70
          },
          {
            "SNO": "s0003",
            "MONTH": "mar",
            "TARGET": 80,
            "QTY_SOLD": 45
          },
          {
            "SNO": "s0004",
            "MONTH": "apr",
            "TARGET": 90,
            "QTY_SOLD": 85
          },
          {
            "SNO": "s0005",
            "MONTH": "nov",
            "TARGET": 100,
            "QTY_SOLD": 120
          }
        ]
      }
    ],
    "queries": [
      {
        "id": "q1",
        "label": "Query (a)",
        "question": "Display total sales by each sales person considering only months where target was reached.",
        "sql": "SELECT sno, sum(qty_sold) AS total_sales FROM sales_details WHERE qty_sold >= target GROUP BY sno;",
        "explanation": "WHERE filters out non-qualifying months before grouping. GROUP BY groups the remaining rows by sales person SNO to sum sales.",
        "keyPoints": [
          "WHERE qty_sold >= target filters prior to aggregation",
          "Only victorious months enter the sum"
        ],
        "output": "s0001: 60, s0002: 70, s0005: 120"
      },
      {
        "id": "q2",
        "label": "Query (b)",
        "question": "If commission of Rs.50 is provided for each item after reaching target, calculate total commission per rep.",
        "sql": "SELECT sno, sum(qty_sold * 50) AS commission_earned FROM sales_details WHERE qty_sold >= target GROUP BY sno;",
        "explanation": "Multiplies quantity sold by Rs. 50 rate for months reaching target and aggregates per rep.",
        "keyPoints": [
          "Math performed row-by-row before grouping",
          "Computes total commission earnings"
        ],
        "output": "s0001: 3000, s0002: 3500, s0005: 6000"
      },
      {
        "id": "q3",
        "label": "Query (c)",
        "question": "Display the SNO of those who NEVER reached their target.",
        "sql": "SELECT DISTINCT sno FROM sales_details WHERE sno NOT IN (SELECT sno FROM sales_details WHERE qty_sold >= target);",
        "explanation": "The inner subquery collects all reps who reached their target at least once. The outer query finds reps absent from that success list.",
        "keyPoints": [
          "Inner query finds anyone who succeeded at least once",
          "NOT IN selects reps with zero qualifying months",
          "DISTINCT removes duplicates from the result"
        ],
        "output": "s0003, s0004"
      },
      {
        "id": "q4",
        "label": "Query (d)",
        "question": "Display SNO, MONTH, and QTY_SOLD of sales persons with SNO s0001 or s0003.",
        "sql": "SELECT sno, month, qty_sold FROM sales_details WHERE sno = 's0001' OR sno = 's0003';",
        "explanation": "OR predicate returns records matching either employee identifier.",
        "keyPoints": [
          "Can also be written with IN ('s0001', 's0003')",
          "Selects specific target employees"
        ],
        "output": "s0001 and s0003 monthly records"
      }
    ],
    "memoryTip": "A Composite Primary Key is like a bank safety box. You need BOTH the customer key and bank officer key together to unlock it.",
    "vivaQuestions": [
      {
        "q": "What is a Composite Primary Key?",
        "a": "A Composite Primary Key is a primary key composed of two or more columns that uniquely identify a row when neither column alone is guaranteed to be unique."
      },
      {
        "q": "How does the 'NOT IN (subquery)' logic find employees who NEVER achieved a target?",
        "a": "The subquery returns all reps who achieved the target at least once. NOT IN then excludes those reps from the list of all employees, leaving only those who never achieved it."
      }
    ]
  },
  {
    "id": "A6",
    "part": "Part A (SQL)",
    "progNum": 6,
    "title": "Suppliers & Inventory Joins",
    "icon": "link",
    "description": "Create SUPPLIERS and COMPUTER_ITEMS tables with Foreign Key constraint. Multi-table JOINs, subqueries with IN, sorting across tables, and CTAS with JOIN condition.",
    "tables": [
      {
        "name": "SUPPLIERS",
        "columns": "SNO (PK), SNAME, SADDR, SCITY",
        "createSql": "CREATE TABLE suppliers (\n  sno VARCHAR2(10) PRIMARY KEY,\n  sname VARCHAR2(20) NOT NULL,\n  saddr VARCHAR2(20),\n  scity VARCHAR2(20)\n);",
        "insertSql": "INSERT INTO suppliers VALUES ('s01', 'microtech', 'lalbagh', 'bangalore');\nINSERT INTO suppliers VALUES ('s02', 'cats', 'bombay', 'mumbai');\nINSERT INTO suppliers VALUES ('s03', 'electrotech', 'koti', 'hyderabad');",
        "sampleRecords": [
          {
            "SNO": "s01",
            "SNAME": "microtech",
            "SCITY": "bangalore"
          },
          {
            "SNO": "s02",
            "SNAME": "cats",
            "SCITY": "mumbai"
          },
          {
            "SNO": "s03",
            "SNAME": "electrotech",
            "SCITY": "hyderabad"
          }
        ]
      },
      {
        "name": "CITEMS",
        "columns": "ITEM_NO (PK), SUPPLIER_NO (FK references SUPPLIERS), ITEM_NAME, IQUANTITY",
        "createSql": "CREATE TABLE citems (\n  item_no VARCHAR2(10) PRIMARY KEY,\n  supplier_no VARCHAR2(10) REFERENCES suppliers(sno),\n  item_name VARCHAR2(20) NOT NULL,\n  iquantity NUMBER(4)\n);",
        "insertSql": "INSERT INTO citems VALUES ('i01', 's01', 'keyboard', 10);\nINSERT INTO citems VALUES ('i02', 's02', 'mouse', 3);\nINSERT INTO citems VALUES ('i03', 's01', 'monitor', 4);\nINSERT INTO citems VALUES ('i04', 's03', 'keyboard', 8);",
        "sampleRecords": [
          {
            "ITEM_NO": "i01",
            "SUPPLIER_NO": "s01",
            "ITEM_NAME": "keyboard",
            "IQUANTITY": 10
          },
          {
            "ITEM_NO": "i02",
            "SUPPLIER_NO": "s02",
            "ITEM_NAME": "mouse",
            "IQUANTITY": 3
          },
          {
            "ITEM_NO": "i03",
            "SUPPLIER_NO": "s01",
            "ITEM_NAME": "monitor",
            "IQUANTITY": 4
          }
        ]
      }
    ],
    "queries": [
      {
        "id": "q1",
        "label": "Query (a)",
        "question": "List ITEM and SUPPLIER details in alphabetical order of city name, and in each city decreasing order of iquantity.",
        "sql": "SELECT i.item_no, i.item_name, s.sno, s.sname, s.scity, i.iquantity\nFROM citems i JOIN suppliers s\nON i.supplier_no = s.sno\nORDER BY s.scity ASC, i.iquantity DESC;",
        "explanation": "Joins items to suppliers on the foreign key relationship, then sorts primarily by city A-Z (ASC) and secondary by inventory descending (DESC).",
        "keyPoints": [
          "ON i.supplier_no = s.sno connects parent to child",
          "Multiple ORDER BY keys sort hierarchy"
        ],
        "output": "Sorted list by City and decreasing Quantity"
      },
      {
        "id": "q2",
        "label": "Query (b)",
        "question": "List name, city, and address of suppliers supplying keyboards.",
        "sql": "SELECT sname, scity, saddr FROM suppliers\nWHERE sno IN (SELECT supplier_no FROM citems WHERE item_name = 'keyboard');",
        "explanation": "Subquery locates supplier numbers supplying keyboards. Outer query pulls full supplier contact information.",
        "keyPoints": [
          "Decouples query logic cleanly via subquery",
          "IN operator handles multi-row subquery return"
        ],
        "output": "microtech (bangalore), electrotech (hyderabad)"
      },
      {
        "id": "q3",
        "label": "Query (c)",
        "question": "List supplier name and items supplied by suppliers 'cats' and 'electrotech'.",
        "sql": "SELECT s.sname, c.item_name FROM suppliers s, citems c\nWHERE s.sno = c.supplier_no AND s.sname IN ('cats', 'electrotech');",
        "explanation": "Traditional comma-join with WHERE join predicate filtered to suppliers matching 'cats' or 'electrotech'.",
        "keyPoints": [
          "Equijoin syntax using WHERE s.sno = c.supplier_no",
          "Restricts results to named supplier list"
        ],
        "output": "cats -> mouse; electrotech -> keyboard"
      },
      {
        "id": "q4",
        "label": "Query (d)",
        "question": "Find items having quantity less than 5 and insert supplier and item details into another table NEWORDER.",
        "sql": "CREATE TABLE neworder AS\nSELECT s.sno, s.sname, s.saddr, s.scity, i.item_no, i.item_name, i.iquantity\nFROM suppliers s, citems i\nWHERE s.sno = i.supplier_no AND i.iquantity < 5;",
        "explanation": "Creates NEWORDER table dynamically populated with the result of a joined query filtering low-stock items (< 5).",
        "keyPoints": [
          "Combines CTAS with relational JOIN",
          "Automatically structures NEWORDER schema based on SELECT list"
        ],
        "output": "Table NEWORDER created with low stock items (mouse: 3, monitor: 4)"
      }
    ],
    "memoryTip": "Foreign Keys are leashes tying two tables together. JOIN uses that leash to pull both tables into the same room.",
    "vivaQuestions": [
      {
        "q": "What is Referential Integrity?",
        "a": "Referential Integrity ensures that foreign key values in a child table must match a valid primary key value in the referenced parent table, preventing orphaned records."
      },
      {
        "q": "What happens if you try to delete a supplier whose items exist in the citems table?",
        "a": "Oracle raises an integrity constraint violation error unless the foreign key is defined with ON DELETE CASCADE."
      }
    ]
  },
  {
    "id": "A7",
    "part": "Part A (SQL)",
    "progNum": 7,
    "title": "Product Sales Analytics & UNION Operations",
    "icon": "layers",
    "description": "Create PRODUCT_DETAIL and PURCHASED_DETAIL tables. Complex joins for customer billing, profit margin computations, UNION operation, and aggregate quantity sums.",
    "tables": [
      {
        "name": "PRODUCT_DETAIL",
        "columns": "P_NO (PK), PRODUCTNAME, QTYAVAILABLE, PRICE, PROFIT",
        "createSql": "CREATE TABLE product_detail (\n  p_no VARCHAR2(10) PRIMARY KEY,\n  productname VARCHAR2(50) NOT NULL,\n  qtyavailable NUMBER NOT NULL,\n  price NUMBER(10,2) NOT NULL,\n  profit NUMBER(5,2)\n);",
        "insertSql": "INSERT INTO product_detail VALUES ('P0001', 'Monitor', 10, 3000, 20);\nINSERT INTO product_detail VALUES ('P0002', 'Pen Drives', 50, 650, 5);\nINSERT INTO product_detail VALUES ('P0003', 'Keyboard', 25, 500, 10);\nINSERT INTO product_detail VALUES ('P0004', 'Mouse', 40, 350, 15);",
        "sampleRecords": [
          {
            "P_NO": "P0001",
            "PRODUCTNAME": "Monitor",
            "QTYAVAILABLE": 10,
            "PRICE": 3000,
            "PROFIT": 20
          },
          {
            "P_NO": "P0002",
            "PRODUCTNAME": "Pen Drives",
            "QTYAVAILABLE": 50,
            "PRICE": 650,
            "PROFIT": 5
          }
        ]
      },
      {
        "name": "PURCHASED_DETAIL",
        "columns": "CUSTNO, P_NO (FK references PRODUCT_DETAIL), QTYSOLD",
        "createSql": "CREATE TABLE purchased_detail (\n  custno VARCHAR2(10),\n  p_no VARCHAR2(10) REFERENCES product_detail(p_no),\n  qtysold NUMBER NOT NULL\n);",
        "insertSql": "INSERT INTO purchased_detail VALUES ('C1', 'P0001', 2);\nINSERT INTO purchased_detail VALUES ('C2', 'P0002', 4);\nINSERT INTO purchased_detail VALUES ('C1', 'P0002', 6);\nINSERT INTO purchased_detail VALUES ('C4', 'P0003', 2);",
        "sampleRecords": [
          {
            "CUSTNO": "C1",
            "P_NO": "P0001",
            "QTYSOLD": 2
          },
          {
            "C2": "C2",
            "P_NO": "P0002",
            "QTYSOLD": 4
          }
        ]
      }
    ],
    "queries": [
      {
        "id": "q1",
        "label": "Query (a)",
        "question": "Display total amount spent by customer C2.",
        "sql": "SELECT pd.custno, sum(p.price * pd.qtysold) AS total_amount_spent\nFROM purchased_detail pd JOIN product_detail p ON pd.p_no = p.p_no\nWHERE pd.custno = 'C2'\nGROUP BY pd.custno;",
        "explanation": "Calculates line item amount (price * qty), joins on product code, filters for C2, and aggregates sum.",
        "keyPoints": [
          "Cross-table arithmetic inside aggregate SUM()",
          "GROUP BY groups by customer identifier"
        ],
        "output": "C2: 4 * 650 = 2600"
      },
      {
        "id": "q2",
        "label": "Query (b)",
        "question": "Display names of products for which either QtyAvailable is less than 30 OR total QtySold is less than 5 (Use UNION).",
        "sql": "SELECT productname FROM product_detail WHERE qtyavailable < 30\nUNION\nSELECT p.productname FROM product_detail p JOIN purchased_detail pd ON p.p_no = pd.p_no\nGROUP BY p.productname HAVING sum(pd.qtysold) < 5;",
        "explanation": "Top query finds products with low stock. Bottom query finds products with low total sales. UNION merges both distinct sets.",
        "keyPoints": [
          "UNION eliminates duplicates automatically",
          "Both queries must output identical column count and types",
          "First uses WHERE; second uses GROUP BY + HAVING"
        ],
        "output": "Distinct product list satisfying either condition"
      },
      {
        "id": "q3",
        "label": "Query (c)",
        "question": "Display name of products and quantity purchased by C4.",
        "sql": "SELECT p.productname, pd.qtysold\nFROM purchased_detail pd JOIN product_detail p ON pd.p_no = p.p_no\nWHERE pd.custno = 'C4';",
        "explanation": "Simple inner join linking purchase records to master product names filtered for customer C4.",
        "keyPoints": [
          "Pulls human-readable productname alongside qtysold",
          "Straightforward relational join"
        ],
        "output": "Keyboard, 2"
      },
      {
        "id": "q4",
        "label": "Query (d)",
        "question": "How much Profit does the shopkeeper get on C1's purchase?",
        "sql": "SELECT pd.custno, sum((p.price * pd.qtysold * p.profit) / 100) AS total_profit\nFROM purchased_detail pd JOIN product_detail p ON pd.p_no = p.p_no\nWHERE pd.custno = 'C1'\nGROUP BY pd.custno;",
        "explanation": "Applies percentage formula ((Price * Qty * Profit%) / 100) to each transaction row for C1 and sums the profit.",
        "keyPoints": [
          "Computes exact business profit percentage",
          "Aggregated across all items bought by customer C1"
        ],
        "output": "Total profit generated from customer C1"
      },
      {
        "id": "q5",
        "label": "Query (e)",
        "question": "How many 'Pen Drives' have been sold in total?",
        "sql": "SELECT sum(pd.qtysold) AS total_pendrives_sold\nFROM purchased_detail pd JOIN product_detail p ON pd.p_no = p.p_no\nWHERE p.productname = 'Pen Drives';",
        "explanation": "Joins transaction details to product catalog, filters for 'Pen Drives', and computes total sum of quantity sold.",
        "keyPoints": [
          "Single scalar result returned",
          "SUM(qtysold) aggregates across multiple purchase transactions"
        ],
        "output": "Total Pen Drives sold: 10"
      }
    ],
    "memoryTip": "UNION is like industrial glue. It takes two distinct lists of items and fuses them into one deduplicated master list.",
    "vivaQuestions": [
      {
        "q": "What is the difference between UNION and UNION ALL?",
        "a": "UNION combines result sets and performs an expensive sort operation to remove duplicate rows. UNION ALL combines results without removing duplicates, making it faster."
      },
      {
        "q": "What rules must be satisfied to use the UNION operator?",
        "a": "Both SELECT queries must have the exact same number of columns in their projection, and corresponding columns must share compatible data types."
      }
    ]
  },
  {
    "id": "B1",
    "part": "Part B (PL/SQL)",
    "progNum": 1,
    "title": "Bank Debit & Built-in Exception Handling",
    "icon": "terminal",
    "description": "Create BANK table. PL/SQL program executes debit transactions with input validation, checks minimum balance rule (> 500), and handles the NO_DATA_FOUND exception.",
    "tables": [
      {
        "name": "BANK",
        "columns": "ACNO (PK), ACT_NAME, ACT_TYPE, BAL",
        "createSql": "CREATE TABLE bank (\n  acno NUMBER PRIMARY KEY,\n  act_name VARCHAR2(20) NOT NULL,\n  act_type VARCHAR2(10) NOT NULL,\n  bal NUMBER(10,2) CHECK (bal > 500)\n);",
        "insertSql": "INSERT INTO bank VALUES (101, 'ravi', 'saving', 2000);\nINSERT INTO bank VALUES (102, 'meena', 'current', 1500);\nINSERT INTO bank VALUES (103, 'kiran', 'saving', 800);",
        "sampleRecords": [
          {
            "ACNO": 101,
            "ACT_NAME": "ravi",
            "ACT_TYPE": "saving",
            "BAL": 2000
          },
          {
            "ACNO": 102,
            "ACT_NAME": "meena",
            "ACT_TYPE": "current",
            "BAL": 1500
          }
        ]
      }
    ],
    "plsql": "SET SERVEROUTPUT ON;\nDECLARE\n  v_acno bank.acno%type := &enter_account_no;\n  v_amount number := &enter_amount;\n  v_balance bank.bal%type;\nBEGIN\n  -- Fetch current account balance\n  SELECT bal INTO v_balance FROM bank WHERE acno = v_acno;\n  \n  -- Validate transaction amount range\n  IF v_amount < 100 OR v_amount > 20000 THEN\n    dbms_output.put_line('Amount must be between 100 and 20000.');\n  -- Ensure minimum balance rule: (Balance - Amount) > 500\n  ELSIF (v_balance - v_amount) > 500 THEN\n    UPDATE bank SET bal = bal - v_amount WHERE acno = v_acno;\n    dbms_output.put_line('Amount of Rs. ' || v_amount || ' debited successfully.');\n    dbms_output.put_line('Remaining balance: Rs. ' || (v_balance - v_amount));\n    COMMIT;\n  ELSE\n    dbms_output.put_line('NO SUFFICIENT BALANCE');\n  END IF;\n\nEXCEPTION\n  WHEN no_data_found THEN\n    dbms_output.put_line('NO SUCH ACCOUNT');\nEND;\n/",
    "memoryTip": "PL/SQL is a sandwich. DECLARE is the top bread, BEGIN is the delicious meat, and EXCEPTION is the napkin for catching messes.",
    "vivaQuestions": [
      {
        "q": "What is the %TYPE attribute in PL/SQL and why is it recommended?",
        "a": "%TYPE anchors a variable's data type to an existing database column (e.g. bank.bal%type). If the column type or length is modified in the schema, the PL/SQL code adapts automatically without manual updates."
      },
      {
        "q": "When is the NO_DATA_FOUND exception raised?",
        "a": "It is raised automatically when a SELECT ... INTO statement returns zero rows from the database."
      }
    ]
  },
  {
    "id": "B2",
    "part": "Part B (PL/SQL)",
    "progNum": 2,
    "title": "Inventory Purchase & User-Defined Exceptions",
    "icon": "bell",
    "description": "Create STOCK_DETAIL table. PL/SQL declares a custom exception 'LOW_STOCK', checks available inventory, and uses RAISE to trigger the exception when requested quantity exceeds available stock.",
    "tables": [
      {
        "name": "STOCK_DETAIL",
        "columns": "PNO (PK), PNAME, QTY_AVL (CHECK > 0)",
        "createSql": "CREATE TABLE stock_detail (\n  pno VARCHAR2(10) PRIMARY KEY,\n  pname VARCHAR2(20) NOT NULL,\n  qty_avl NUMBER(4) CHECK (qty_avl > 0)\n);",
        "insertSql": "INSERT INTO stock_detail VALUES ('p001', 'keyboard', 20);\nINSERT INTO stock_detail VALUES ('p002', 'mouse', 15);\nINSERT INTO stock_detail VALUES ('p003', 'printer', 5);",
        "sampleRecords": [
          {
            "PNO": "p001",
            "PNAME": "keyboard",
            "QTY_AVL": 20
          },
          {
            "PNO": "p002",
            "PNAME": "mouse",
            "QTY_AVL": 15
          }
        ]
      }
    ],
    "plsql": "SET SERVEROUTPUT ON;\nDECLARE\n  v_pno stock_detail.pno%type := '&enter_product_no';\n  v_qty_req number := &enter_quantity;\n  v_qty_avl stock_detail.qty_avl%type;\n  low_stock EXCEPTION; -- 1. Declare custom exception\nBEGIN\n  SELECT qty_avl INTO v_qty_avl FROM stock_detail WHERE pno = v_pno;\n  \n  -- Check availability\n  IF v_qty_req > v_qty_avl THEN\n    RAISE low_stock; -- 2. Explicitly trigger exception\n  ELSE\n    UPDATE stock_detail SET qty_avl = qty_avl - v_qty_req WHERE pno = v_pno;\n    dbms_output.put_line('Purchase successful!');\n    dbms_output.put_line('Remaining stock: ' || (v_qty_avl - v_qty_req));\n    COMMIT;\n  END IF;\n\nEXCEPTION\n  -- 3. Handle exceptions\n  WHEN no_data_found THEN\n    dbms_output.put_line('NO SUCH PRODUCT FOUND');\n  WHEN low_stock THEN\n    dbms_output.put_line('NO SUFFICIENT STOCK');\nEND;\n/",
    "memoryTip": "RAISE is like pulling the emergency fire alarm. It halts normal program execution and jumps straight to the EXCEPTION handler.",
    "vivaQuestions": [
      {
        "q": "What are the three steps required to implement a user-defined exception in PL/SQL?",
        "a": "1. DECLARE the exception in the declaration section (name EXCEPTION;), 2. RAISE the exception in the executable section using the RAISE statement, 3. Handle it in the EXCEPTION section under WHEN exception_name THEN."
      },
      {
        "q": "What happens if an exception is raised but has no matching WHEN clause in the EXCEPTION block?",
        "a": "The unhandled exception propagates up to the calling environment (or client application) and terminates the program abruptly with an ORA error code."
      }
    ]
  },
  {
    "id": "B3",
    "part": "Part B (PL/SQL)",
    "progNum": 3,
    "title": "Book Selling Price Calculation (Explicit Cursor)",
    "icon": "mouse-pointer",
    "description": "PL/SQL program uses an Explicit Cursor with OPEN, FETCH, and CLOSE commands in a LOOP to compute discounted selling price row-by-row based on book category and code.",
    "tables": [
      {
        "name": "BOOK",
        "columns": "BOOK_CODE, AUTHOR, TITLE, CATEGORY, PRICE",
        "createSql": "CREATE TABLE book (\n  book_code CHAR(1),\n  author VARCHAR2(20),\n  title VARCHAR2(30),\n  category VARCHAR2(20),\n  price NUMBER(8,2)\n);",
        "insertSql": "INSERT INTO book VALUES ('A', 'rashmi', 'infotechnology', 'novels', 125);\nINSERT INTO book VALUES ('A', 'likith', 'microtechnology', 'technology', 900);\nINSERT INTO book VALUES ('B', 'gagan', 'ecommerce', 'commerce', 1500);\nINSERT INTO book VALUES ('B', 'vijeth', 'relatives', 'science', 2500);\nINSERT INTO book VALUES ('C', 'manoj', 'sports_today', 'sports', 450);",
        "sampleRecords": [
          {
            "BOOK_CODE": "A",
            "CATEGORY": "novels",
            "PRICE": 125
          },
          {
            "BOOK_CODE": "B",
            "CATEGORY": "commerce",
            "PRICE": 1500
          }
        ]
      }
    ],
    "plsql": "SET SERVEROUTPUT ON;\nDECLARE\n  -- 1. Declare explicit cursor\n  CURSOR book_cur IS\n    SELECT book_code, author, title, category, price FROM book;\n    \n  v_code book.book_code%type;\n  v_auth book.author%type;\n  v_title book.title%type;\n  v_cat book.category%type;\n  v_price book.price%type;\n  v_disc number(5,2);\n  v_sell number(8,2);\nBEGIN\n  -- 2. Open cursor\n  OPEN book_cur;\n  dbms_output.put_line('Code | Category | Title | Price | Disc% | Sell Price');\n  dbms_output.put_line('---------------------------------------------------------');\n  \n  LOOP\n    -- 3. Fetch row into variables\n    FETCH book_cur INTO v_code, v_auth, v_title, v_cat, v_price;\n    EXIT WHEN book_cur%notfound; -- Check EOF\n    \n    -- Discount rule evaluation\n    IF (v_code='A' and v_cat='novels') THEN v_disc := 10;\n    ELSIF (v_code='A' and v_cat='technology') THEN v_disc := 12.5;\n    ELSIF (v_code='B' and v_cat='commerce') THEN v_disc := 18;\n    ELSIF (v_code='B' and v_cat='science') THEN v_disc := 19;\n    ELSIF (v_code='C' and v_cat='sports') THEN v_disc := 24;\n    ELSE v_disc := 0;\n    END IF;\n    \n    v_sell := v_price - (v_price * v_disc / 100);\n    dbms_output.put_line(v_code || ' | ' || v_cat || ' | ' || v_title || ' | ' || v_price || ' | ' || v_disc || '% | ' || v_sell);\n  END LOOP;\n  \n  -- 4. Close cursor\n  CLOSE book_cur;\nEND;\n/",
    "memoryTip": "A cursor is like eating pizza: OPEN the box, FETCH one slice at a time in a LOOP, and CLOSE the box when you are done.",
    "vivaQuestions": [
      {
        "q": "What are the four essential lifecycle steps of an Explicit Cursor?",
        "a": "1. DECLARE (define the SQL query), 2. OPEN (allocate memory and execute query), 3. FETCH (retrieve row into PL/SQL variables in a loop), 4. CLOSE (release private memory area)."
      },
      {
        "q": "What are the four explicit cursor attributes in Oracle?",
        "a": "%FOUND (true if fetch returned row), %NOTFOUND (true if no rows left), %ROWCOUNT (number of rows fetched so far), and %ISOPEN (true if cursor is currently open)."
      }
    ]
  },
  {
    "id": "B4",
    "part": "Part B (PL/SQL)",
    "progNum": 4,
    "title": "Employee Payroll Procedure (Cursor FOR Loop & OUT Params)",
    "icon": "calculator",
    "description": "Reusable PL/SQL Stored PROCEDURE with IN and OUT parameters to compute paybill allowances (DA, HRA, PF, TAX, Gross, Net), executed across all employees using a Cursor FOR Loop.",
    "tables": [
      {
        "name": "EMPLOYEE",
        "columns": "EMPNUM (PK), EMPNAME, BASIC",
        "createSql": "CREATE TABLE employee (\n  empnum NUMBER(6) PRIMARY KEY,\n  empname VARCHAR2(20) NOT NULL,\n  basic NUMBER(10,2) NOT NULL\n);",
        "insertSql": "INSERT INTO employee VALUES (1001, 'radha', 20000);\nINSERT INTO employee VALUES (1002, 'vishwa', 30000);\nINSERT INTO employee VALUES (1003, 'krish', 5000);",
        "sampleRecords": [
          {
            "EMPNUM": 1001,
            "EMPNAME": "radha",
            "BASIC": 20000
          },
          {
            "EMPNUM": 1002,
            "EMPNAME": "vishwa",
            "BASIC": 30000
          }
        ]
      }
    ],
    "plsql": "SET SERVEROUTPUT ON;\n\n-- 1. Create Stored Procedure with OUT parameters\nCREATE OR REPLACE PROCEDURE paybill (\n  p_basic IN NUMBER,\n  p_da OUT NUMBER,\n  p_hra OUT NUMBER,\n  p_tax OUT NUMBER,\n  p_pf OUT NUMBER,\n  p_gross OUT NUMBER,\n  p_net OUT NUMBER\n) IS\nBEGIN\n  -- DA & HRA slab calculations\n  IF p_basic <= 20000 THEN\n    p_da := p_basic * 0.35;\n    p_hra := p_basic * 0.80;\n  ELSIF p_basic > 20000 AND p_basic <= 30000 THEN\n    p_da := p_basic * 0.38;\n    p_hra := p_basic * 0.90;\n  ELSE\n    p_da := p_basic * 0.45;\n    p_hra := p_basic * 0.10;\n  END IF;\n  \n  p_gross := p_basic + p_da + p_hra;\n  \n  -- PF calculation: 12% of Gross or Rs. 2000 whichever is minimum\n  p_pf := p_gross * 0.12;\n  IF p_pf > 2000 THEN p_pf := 2000; END IF;\n  \n  -- Tax calculation\n  IF p_gross <= 25000 THEN p_tax := 100; ELSE p_tax := 200; END IF;\n  \n  p_net := p_gross - (p_pf + p_tax);\nEND;\n/\n\n-- 2. Calling Block using Cursor FOR Loop\nDECLARE\n  v_da NUMBER; v_hra NUMBER; v_tax NUMBER;\n  v_pf NUMBER; v_gross NUMBER; v_net NUMBER;\nBEGIN\n  -- Cursor FOR loop automatically handles OPEN, FETCH, and CLOSE!\n  FOR emp_rec IN (SELECT empnum, empname, basic FROM employee) LOOP\n    paybill(emp_rec.basic, v_da, v_hra, v_tax, v_pf, v_gross, v_net);\n    \n    DBMS_OUTPUT.PUT_LINE('================================');\n    DBMS_OUTPUT.PUT_LINE('Emp No   : ' || emp_rec.empnum);\n    DBMS_OUTPUT.PUT_LINE('Emp Name : ' || emp_rec.empname);\n    DBMS_OUTPUT.PUT_LINE('Basic    : ' || emp_rec.basic);\n    DBMS_OUTPUT.PUT_LINE('Gross Pay: ' || v_gross);\n    DBMS_OUTPUT.PUT_LINE('Net Pay  : ' || v_net);\n  END LOOP;\nEND;\n/",
    "memoryTip": "A Procedure is like an accountant: you hand them the basic salary (IN), and they calculate and return a stack of deductions and net pay (OUT).",
    "vivaQuestions": [
      {
        "q": "What is the key advantage of a Cursor FOR Loop over a standard LOOP?",
        "a": "A Cursor FOR Loop automatically declares an index record, opens the cursor, fetches all rows sequentially, terminates when %NOTFOUND is reached, and closes the cursor automatically, eliminating boilerplate code."
      },
      {
        "q": "What are the three parameter modes in PL/SQL subprograms?",
        "a": "IN (read-only input from caller), OUT (write-only return value back to caller), and IN OUT (passes initial value and returns updated value)."
      }
    ]
  },
  {
    "id": "B5",
    "part": "Part B (PL/SQL)",
    "progNum": 5,
    "title": "Inventory Package (PCK_ITEM Spec & Body)",
    "icon": "package",
    "description": "Encapsulate inventory business logic in PL/SQL PACKAGE PCK_ITEM. Specification declares public interface (CHK_ITEM function & PROC_ITEM procedure); Body implements stock validation and transaction logging.",
    "tables": [
      {
        "name": "ITEM_MASTER",
        "columns": "ITEMNO (PK), NAME, STOCK (CHECK > 0), UNIT_PRICE (CHECK > 0)",
        "createSql": "CREATE TABLE item_master (\n  itemno NUMBER PRIMARY KEY,\n  name VARCHAR2(20) NOT NULL,\n  stock NUMBER CHECK (stock > 0),\n  unit_price NUMBER CHECK (unit_price > 0)\n);",
        "insertSql": "INSERT INTO item_master VALUES (1, 'Mouse', 10, 150);\nINSERT INTO item_master VALUES (2, 'Keyboard', 20, 350);",
        "sampleRecords": [
          {
            "ITEMNO": 1,
            "NAME": "Mouse",
            "STOCK": 10,
            "UNIT_PRICE": 150
          }
        ]
      },
      {
        "name": "ITEM_TRANS",
        "columns": "ITEMNO (FK), QUANTITY, TRANS_DATE",
        "createSql": "CREATE TABLE item_trans (\n  itemno NUMBER REFERENCES item_master(itemno),\n  quantity NUMBER NOT NULL,\n  trans_date DATE NOT NULL\n);",
        "insertSql": "-- Transactions logged by procedure",
        "sampleRecords": []
      }
    ],
    "plsql": "SET SERVEROUTPUT ON;\n\n-- 1. Package Specification (Public Interface / Menu)\nCREATE OR REPLACE PACKAGE pck_item AS\n  FUNCTION chk_item(p_itemno IN NUMBER) RETURN NUMBER;\n  PROCEDURE proc_item(p_itemno IN NUMBER, p_qty IN NUMBER);\nEND pck_item;\n/\n\n-- 2. Package Body (Implementation / Kitchen)\nCREATE OR REPLACE PACKAGE BODY pck_item AS\n\n  -- Function to check whether item exists\n  FUNCTION chk_item(p_itemno IN NUMBER) RETURN NUMBER IS\n    v_count NUMBER;\n  BEGIN\n    SELECT COUNT(*) INTO v_count FROM item_master WHERE itemno = p_itemno;\n    IF v_count = 1 THEN RETURN 1; ELSE RETURN 0; END IF;\n  END chk_item;\n\n  -- Procedure to process transaction and update stock\n  PROCEDURE proc_item(p_itemno IN NUMBER, p_qty IN NUMBER) IS\n    v_stock item_master.stock%TYPE;\n    v_name item_master.name%TYPE;\n    v_price item_master.unit_price%TYPE;\n  BEGIN\n    -- Check item existence using package function\n    IF chk_item(p_itemno) = 0 THEN\n      DBMS_OUTPUT.PUT_LINE('Item does not exist in master catalog!');\n      RETURN;\n    END IF;\n    \n    SELECT stock, name, unit_price INTO v_stock, v_name, v_price\n    FROM item_master WHERE itemno = p_itemno;\n    \n    IF p_qty > v_stock THEN\n      DBMS_OUTPUT.PUT_LINE('Insufficient stock! Available: ' || v_stock);\n    ELSE\n      INSERT INTO item_trans VALUES (p_itemno, p_qty, SYSDATE);\n      UPDATE item_master SET stock = stock - p_qty WHERE itemno = p_itemno;\n      DBMS_OUTPUT.PUT_LINE('Transaction Recorded for ' || v_name);\n      DBMS_OUTPUT.PUT_LINE('Total Cost: Rs. ' || (v_price * p_qty));\n      COMMIT;\n    END IF;\n  END proc_item;\n\nEND pck_item;\n/\n\n-- 3. Execution Block\nBEGIN\n  pck_item.proc_item(1, 4); -- Buy 4 units of item 1\nEND;\n/",
    "memoryTip": "A Package Specification is a restaurant menu (shows what can be ordered). The Package Body is the kitchen (where the dishes are actually prepared).",
    "vivaQuestions": [
      {
        "q": "What is the difference between a Package Specification and a Package Body?",
        "a": "The Specification declares public constructs (functions, procedures, variables, types) visible to other schemas. The Body contains the executable implementation and private constructs."
      },
      {
        "q": "Can you change the Package Body without recompiling the Specification?",
        "a": "Yes! As long as the subprogram signatures in the specification remain unchanged, the body can be modified and recompiled without invalidating dependent database objects."
      }
    ]
  },
  {
    "id": "B6",
    "part": "Part B (PL/SQL)",
    "progNum": 6,
    "title": "Mathematics Package (Factorial, nCr & nPr)",
    "icon": "function-square",
    "description": "PL/SQL Math Package containing a recursive or iterative FUNCTION to compute Factorial of N, and PROCEDURES to calculate Permutations (nPr) and Combinations (nCr).",
    "tables": [],
    "plsql": "SET SERVEROUTPUT ON;\n\n-- 1. Package Specification\nCREATE OR REPLACE PACKAGE math_package AS\n  FUNCTION factorial(n NUMBER) RETURN NUMBER;\n  PROCEDURE calc_nCr(n NUMBER, r NUMBER);\n  PROCEDURE calc_nPr(n NUMBER, r NUMBER);\nEND math_package;\n/\n\n-- 2. Package Body\nCREATE OR REPLACE PACKAGE BODY math_package AS\n\n  -- Factorial function: N!\n  FUNCTION factorial(n NUMBER) RETURN NUMBER IS\n    f NUMBER := 1;\n  BEGIN\n    IF n < 0 THEN RETURN 0; END IF;\n    IF n = 0 OR n = 1 THEN RETURN 1; END IF;\n    FOR i IN 1..n LOOP\n      f := f * i;\n    END LOOP;\n    RETURN f;\n  END factorial;\n\n  -- Combinations formula: nCr = n! / (r! * (n-r)!)\n  PROCEDURE calc_nCr(n NUMBER, r NUMBER) IS\n    ans NUMBER;\n  BEGIN\n    IF r > n OR r < 0 THEN\n      DBMS_OUTPUT.PUT_LINE('Invalid parameters: r cannot exceed n.');\n      RETURN;\n    END IF;\n    ans := factorial(n) / (factorial(r) * factorial(n - r));\n    DBMS_OUTPUT.PUT_LINE(n || 'C' || r || ' = ' || ans);\n  END calc_nCr;\n\n  -- Permutations formula: nPr = n! / (n-r)!\n  PROCEDURE calc_nPr(n NUMBER, r NUMBER) IS\n    ans NUMBER;\n  BEGIN\n    IF r > n OR r < 0 THEN\n      DBMS_OUTPUT.PUT_LINE('Invalid parameters: r cannot exceed n.');\n      RETURN;\n    END IF;\n    ans := factorial(n) / factorial(n - r);\n    DBMS_OUTPUT.PUT_LINE(n || 'P' || r || ' = ' || ans);\n  END calc_nPr;\n\nEND math_package;\n/\n\n-- 3. Execution Block\nDECLARE\n  n NUMBER := 5;\n  r NUMBER := 2;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE('Factorial of ' || n || ' = ' || math_package.factorial(n));\n  math_package.calc_nCr(n, r);\n  math_package.calc_nPr(n, r);\nEND;\n/",
    "memoryTip": "Functions CALCULATE and RETURN a value. Procedures DO actions. Packages pack them into one toolbox.",
    "vivaQuestions": [
      {
        "q": "What is the primary difference between a FUNCTION and a PROCEDURE?",
        "a": "A Function MUST return a single value using the RETURN clause and can be called directly within SQL SELECT statements. A Procedure performs actions and cannot be embedded directly in a SELECT query."
      },
      {
        "q": "What is the scope of variables declared inside a Package Specification?",
        "a": "Variables declared in the package specification have session-level persistence and are accessible by any user granted EXECUTE privilege on the package."
      }
    ]
  },
  {
    "id": "B7",
    "part": "Part B (PL/SQL)",
    "progNum": 7,
    "title": "Database Triggers (Audit & Stock Auto-Sync)",
    "icon": "zap",
    "description": "Create MASTER, SALES, and NEWSTOCK tables. Implement Database Triggers using AFTER INSERT and DML predicates (INSERTING, UPDATING, DELETING) with :NEW and :OLD references to automatically synchronize sales totals and current inventory.",
    "tables": [
      {
        "name": "MASTER",
        "columns": "PRODUCT_ID (PK), PRODUCT_NAME, TOTAL_SALES, CURRENT_STOCK",
        "createSql": "CREATE TABLE master (\n  product_id NUMBER PRIMARY KEY,\n  product_name VARCHAR2(30) NOT NULL,\n  total_sales NUMBER DEFAULT 0,\n  current_stock NUMBER DEFAULT 0\n);",
        "insertSql": "INSERT INTO master VALUES (101, 'Dell Mouse', 0, 100);\nINSERT INTO master VALUES (102, 'Mechanical Keyboard', 0, 50);",
        "sampleRecords": [
          {
            "PRODUCT_ID": 101,
            "PRODUCT_NAME": "Dell Mouse",
            "TOTAL_SALES": 0,
            "CURRENT_STOCK": 100
          }
        ]
      },
      {
        "name": "SALES",
        "columns": "SALE_ID (PK), PRODUCT_ID (FK), QUANTITY_SOLD, SALE_DATE",
        "createSql": "CREATE TABLE sales (\n  sale_id NUMBER PRIMARY KEY,\n  product_id NUMBER REFERENCES master(product_id),\n  quantity_sold NUMBER NOT NULL,\n  sale_date DATE NOT NULL\n);",
        "insertSql": "-- Handled by Trigger",
        "sampleRecords": []
      },
      {
        "name": "NEWSTOCK",
        "columns": "STOCK_ID (PK), PRODUCT_ID (FK), QUANTITY_ADDED, STOCK_DATE",
        "createSql": "CREATE TABLE newstock (\n  stock_id NUMBER PRIMARY KEY,\n  product_id NUMBER REFERENCES master(product_id),\n  quantity_added NUMBER NOT NULL,\n  stock_date DATE NOT NULL\n);",
        "insertSql": "-- Handled by Trigger",
        "sampleRecords": []
      }
    ],
    "plsql": "SET SERVEROUTPUT ON;\n\n-- Trigger 1: Automatically updates MASTER table when sales occur\nCREATE OR REPLACE TRIGGER trg_after_sales\nAFTER INSERT ON sales\nFOR EACH ROW\nBEGIN\n  UPDATE master\n  SET total_sales = NVL(total_sales, 0) + :new.quantity_sold,\n      current_stock = NVL(current_stock, 0) - :new.quantity_sold\n  WHERE product_id = :new.product_id;\nEND;\n/\n\n-- Trigger 2: Automatically updates MASTER when stock shipments are modified\nCREATE OR REPLACE TRIGGER trg_dml_newstock\nAFTER INSERT OR UPDATE OR DELETE ON newstock\nFOR EACH ROW\nBEGIN\n  IF INSERTING THEN\n    UPDATE master\n    SET current_stock = NVL(current_stock, 0) + :new.quantity_added\n    WHERE product_id = :new.product_id;\n    \n  ELSIF DELETING THEN\n    UPDATE master\n    SET current_stock = NVL(current_stock, 0) - :old.quantity_added\n    WHERE product_id = :old.product_id;\n    \n  ELSIF UPDATING THEN\n    UPDATE master\n    SET current_stock = current_stock - :old.quantity_added + :new.quantity_added\n    WHERE product_id = :new.product_id;\n  END IF;\nEND;\n/\n\n-- Test Trigger Execution:\nINSERT INTO sales VALUES (1, 101, 10, SYSDATE);\n-- Verify Master table updated:\nSELECT * FROM master WHERE product_id = 101;\n-- Current Stock drops to 90, Total Sales increases to 10!\n",
    "memoryTip": "A Trigger is a watchdog that sleeps until someone touches the table. ':new' is the fresh bone someone just brought in; ':old' is the old bone being replaced.",
    "vivaQuestions": [
      {
        "q": "What is the purpose of 'FOR EACH ROW' in a Trigger declaration?",
        "a": "'FOR EACH ROW' specifies a row-level trigger that fires once for every individual row modified by the triggering DML statement, enabling access to :new and :old correlation qualifiers."
      },
      {
        "q": "What are :NEW and :OLD correlation variables and when are they available?",
        "a": ":NEW contains the proposed column value for INSERT and UPDATE operations. :OLD contains the pre-existing column value for UPDATE and DELETE operations."
      },
      {
        "q": "Can a trigger execute COMMIT or ROLLBACK?",
        "a": "No, standard database triggers cannot issue COMMIT or ROLLBACK because they are part of the outer transaction that fired them (unless defined as AUTONOMOUS_TRANSACTION)."
      }
    ]
  }
];

// Key Concepts Dictionary
const DBMS_CONCEPTS = {
  "like": {
    "title": "LIKE Pattern Matching",
    "description": "Searches for text matching patterns using wildcards: '%' (zero or more characters) and '_' (exactly one character).",
    "example": "SELECT * FROM employee WHERE name LIKE '%Raj';\nSELECT * FROM book WHERE publisher LIKE '_a%';",
    "examTip": "Examiners love asking: What is the difference between % and _?"
  },
  "where vs having": {
    "title": "WHERE vs HAVING",
    "description": "WHERE filters individual rows BEFORE grouping and cannot take aggregate functions. HAVING filters entire groups AFTER GROUP BY and evaluates aggregate expressions (SUM, COUNT, AVG).",
    "example": "SELECT department, sum(salary) FROM employee WHERE gender = 'F' GROUP BY department HAVING sum(salary) > 30000;",
    "examTip": "Crucial distinction: WHERE filters rows; HAVING filters buckets."
  },
  "self join": {
    "title": "Self-Join",
    "description": "A table joined with ITSELF using two different aliases. Essential when hierarchical relationships exist within the same table (e.g. employee and manager).",
    "example": "SELECT s.sname, m.salary AS mgr_salary FROM sales s JOIN sales m ON s.manager_name = m.sname WHERE (s.salary + s.commission) > m.salary;",
    "examTip": "Remember: Aliases (like s and m) are mandatory so the database can distinguish left and right table instances."
  },
  "composite key": {
    "title": "Composite Primary Key",
    "description": "A primary key made of TWO or more columns together. Neither column alone is unique, but their combination is always unique.",
    "example": "CREATE TABLE sales_details (\n  sno VARCHAR2(10),\n  month VARCHAR2(10),\n  target NUMBER(10),\n  qty_sold NUMBER(10),\n  PRIMARY KEY (sno, month)\n);",
    "examTip": "Program 5 in your record uses (SNO, MONTH) because a salesperson works multiple months."
  },
  "ctas": {
    "title": "CREATE TABLE AS SELECT (CTAS)",
    "description": "Creates a brand-new table structure and immediately populates it with the results of a SELECT query.",
    "example": "CREATE TABLE client1 AS SELECT client_no, name FROM client WHERE state = 'Karnataka';\nCREATE TABLE client2 AS SELECT * FROM client WHERE 1=2; -- Empty clone",
    "examTip": "WHERE 1=2 is the famous trick to clone table structure without copying any rows!"
  },
  "where 1=2": {
    "title": "WHERE 1=2 (Empty Structure Clone)",
    "description": "Because 1=2 is always FALSE, zero rows are fetched from the source table. But Oracle still copies all column headers, datatypes, and nullability to create a clean empty clone table.",
    "example": "CREATE TABLE client2 AS SELECT * FROM client WHERE 1=2;",
    "examTip": "Common viva question: How do you duplicate a table's structure without copying data?"
  },
  "union vs union all": {
    "title": "UNION vs UNION ALL",
    "description": "UNION combines result sets of two SELECT queries and removes duplicate records (via sorting). UNION ALL keeps all records, including duplicates, and is faster.",
    "example": "SELECT productname FROM product_detail WHERE qtyavailable < 30\nUNION\nSELECT p.productname FROM product_detail p JOIN purchased_detail pd ON p.p_no = pd.p_no GROUP BY p.productname HAVING sum(pd.qtysold) < 5;",
    "examTip": "Rules: Both SELECT queries must output the same number of columns with matching datatypes."
  },
  "cursor": {
    "title": "PL/SQL Cursors",
    "description": "A cursor is a private SQL work area that points to multi-row query results and lets you process records row-by-row in a loop.",
    "example": "DECLARE\n  CURSOR cur IS SELECT title, price FROM book;\nBEGIN\n  OPEN cur;\n  LOOP\n    FETCH cur INTO v_title, v_price;\n    EXIT WHEN cur%NOTFOUND;\n  END LOOP;\n  CLOSE cur;\nEND;",
    "examTip": "Four lifecycle steps: DECLARE -> OPEN -> FETCH (in loop) -> CLOSE. Plus 4 attributes: %FOUND, %NOTFOUND, %ROWCOUNT, %ISOPEN."
  },
  "cursor for loop": {
    "title": "Cursor FOR Loop",
    "description": "A streamlined PL/SQL loop that automatically opens the cursor, fetches all records, exits when done, and closes the cursor without manual boilerplate.",
    "example": "FOR emp_rec IN (SELECT empnum, empname, basic FROM employee) LOOP\n  paybill(emp_rec.basic, v_da, v_hra, v_tax, v_pf, v_gross, v_net);\nEND LOOP;",
    "examTip": "Used in Program B4 (Payroll) for clean, bug-free cursor handling."
  },
  "user exception": {
    "title": "User-Defined Exceptions",
    "description": "Custom errors defined by the programmer to handle domain-specific violations (e.g. low stock, insufficient balance).",
    "example": "DECLARE\n  low_stock EXCEPTION;\nBEGIN\n  IF v_qty_req > v_qty_avl THEN\n    RAISE low_stock;\n  END IF;\nEXCEPTION\n  WHEN low_stock THEN\n    dbms_output.put_line('NO SUFFICIENT STOCK');\nEND;",
    "examTip": "Three steps: 1. Declare (name EXCEPTION;), 2. Trigger (RAISE name;), 3. Catch (WHEN name THEN ...)."
  },
  "procedure vs function": {
    "title": "Procedure vs Function",
    "description": "A Procedure executes actions and returns zero or multiple values via OUT parameters. A Function calculates and must return exactly ONE value using RETURN, and can be used directly inside SQL SELECT queries.",
    "example": "FUNCTION factorial(n NUMBER) RETURN NUMBER ...\nPROCEDURE paybill(p_basic IN NUMBER, p_net OUT NUMBER) ...",
    "examTip": "Viva favorite: Can a procedure be called inside a SELECT statement? No, only functions with RETURN can!"
  },
  "package": {
    "title": "PL/SQL Packages",
    "description": "Encapsulates related procedures, functions, types, and variables into a single modular unit. Consists of a Specification (public interface) and Body (implementation).",
    "example": "CREATE OR REPLACE PACKAGE pck_item AS ...\nCREATE OR REPLACE PACKAGE BODY pck_item AS ...",
    "examTip": "Changing the package body does not invalidate client programs relying on the package spec!"
  },
  "triggers": {
    "title": "Database Triggers",
    "description": "Stored PL/SQL programs that automatically execute ('fire') in response to DML operations (INSERT, UPDATE, DELETE) on a table or view.",
    "example": "CREATE OR REPLACE TRIGGER trg_sales\nAFTER INSERT ON sales\nFOR EACH ROW\nBEGIN\n  UPDATE master SET current_stock = current_stock - :new.quantity_sold\n  WHERE product_id = :new.product_id;\nEND;",
    "examTip": "Row-level triggers use 'FOR EACH ROW' and have access to :new and :old correlation qualifiers."
  },
  ":new and :old": {
    "title": ":NEW and :OLD in Triggers",
    "description": ":NEW holds the proposed newly inserted or updated column values. :OLD holds the existing column values before an update or deletion.",
    "example": "-- On INSERT: :new has data, :old is NULL\n-- On DELETE: :old has data, :new is NULL\n-- On UPDATE: both :new and :old have data",
    "examTip": "Essential for audit logs and automated stock synchronization."
  },
  "%type": {
    "title": "%TYPE Attribute",
    "description": "Declares a variable having the exact same datatype as an existing database column or another variable.",
    "example": "v_balance bank.bal%TYPE;\nv_acno bank.acno%TYPE;",
    "examTip": "Ensures code never breaks if column width or precision changes in the underlying table."
  },
  "trunc and months_between": {
    "title": "TRUNC & MONTHS_BETWEEN",
    "description": "MONTHS_BETWEEN(d1, d2) calculates elapsed months. TRUNC chops off decimal fractions without rounding.",
    "example": "SELECT * FROM sales WHERE TRUNC(MONTHS_BETWEEN(sysdate, join_date)/12) >= 10;",
    "examTip": "TRUNC(10.99) equals 10, not 11!"
  }
};

// Lab Viva Voce Question Bank
const VIVA_BANK = [
  {
    "id": "v1",
    "category": "SQL Basics & Constraints",
    "q": "What is the difference between Primary Key and Unique constraint?",
    "modelAnswer": "A Primary Key uniquely identifies each row and strictly forbids NULL values (only one primary key per table). A Unique constraint also prevents duplicate values but permits NULL values (and a table can have multiple Unique constraints).",
    "keywords": [
      "null",
      "duplicate",
      "one per table",
      "multiple"
    ]
  },
  {
    "id": "v2",
    "category": "Query Filtering",
    "q": "Explain the difference between WHERE clause and HAVING clause.",
    "modelAnswer": "WHERE filters individual rows BEFORE grouping occurs and cannot accept aggregate functions. HAVING filters aggregated groups AFTER the GROUP BY clause and evaluates expressions with aggregate functions like SUM, COUNT, AVG.",
    "keywords": [
      "before",
      "after",
      "aggregate",
      "group by",
      "rows",
      "groups"
    ]
  },
  {
    "id": "v3",
    "category": "Joins",
    "q": "What is a Self-Join and why are table aliases necessary?",
    "modelAnswer": "A Self-Join is joining a table with itself to evaluate relationships among its own rows (like employee and manager). Table aliases are mandatory so the SQL engine can differentiate the two logical copies of the table.",
    "keywords": [
      "itself",
      "alias",
      "manager",
      "hierarchical",
      "ambiguous"
    ]
  },
  {
    "id": "v4",
    "category": "Table DDL",
    "q": "How does the 'WHERE 1=2' trick create an empty table clone?",
    "modelAnswer": "Since 1=2 is an impossible condition that always evaluates to FALSE, no data rows are selected from the source table. However, the database compiler inspects the projection and creates an identical table schema with matching columns and datatypes.",
    "keywords": [
      "false",
      "zero rows",
      "structure",
      "schema",
      "empty",
      "metadata"
    ]
  },
  {
    "id": "v5",
    "category": "PL/SQL Fundamentals",
    "q": "What are the four mandatory components of an explicit cursor's lifecycle?",
    "modelAnswer": "1. DECLARE (naming the cursor and defining its SELECT query), 2. OPEN (allocating memory and executing the query), 3. FETCH (retrieving rows sequentially into variables in a loop), and 4. CLOSE (releasing the private memory work area).",
    "keywords": [
      "declare",
      "open",
      "fetch",
      "close",
      "memory"
    ]
  },
  {
    "id": "v6",
    "category": "PL/SQL Subprograms",
    "q": "What is the difference between a Stored Procedure and a Function in PL/SQL?",
    "modelAnswer": "A Function must return a value using the RETURN clause and can be called directly within SQL SELECT statements. A Procedure performs actions, returns values through OUT parameters, and cannot be invoked directly in a SELECT expression.",
    "keywords": [
      "return",
      "select",
      "out parameter",
      "actions"
    ]
  },
  {
    "id": "v7",
    "category": "Triggers",
    "q": "What is the difference between Statement-level and Row-level triggers?",
    "modelAnswer": "A Statement-level trigger fires only once for the entire SQL statement regardless of how many rows are impacted. A Row-level trigger contains 'FOR EACH ROW' and fires once for every single row affected, allowing access to :NEW and :OLD correlation variables.",
    "keywords": [
      "for each row",
      "once per statement",
      "every row",
      ":new",
      ":old"
    ]
  },
  {
    "id": "v8",
    "category": "Packages",
    "q": "What are the two components of a PL/SQL Package and what is the purpose of each?",
    "modelAnswer": "A Package has a Specification and a Body. The Specification is the public interface declaring subprograms and types visible to callers. The Body contains the actual implementation code and private constructs.",
    "keywords": [
      "specification",
      "body",
      "public",
      "interface",
      "implementation"
    ]
  },
  {
    "id": "v9",
    "category": "Exceptions",
    "q": "How do you define, trigger, and handle a User-Defined Exception in PL/SQL?",
    "modelAnswer": "1. Declare it in the DECLARE block as: exception_name EXCEPTION;\n2. Trigger it using the RAISE statement: IF condition THEN RAISE exception_name; END IF;\n3. Catch it in the EXCEPTION block: WHEN exception_name THEN ...",
    "keywords": [
      "declare",
      "raise",
      "when",
      "exception block"
    ]
  },
  {
    "id": "v10",
    "category": "Set Operations",
    "q": "What is the difference between UNION and UNION ALL?",
    "modelAnswer": "UNION combines result sets and performs a distinct sort to eliminate duplicate rows. UNION ALL combines result sets directly without deduplication, preserving all duplicates and executing much faster.",
    "keywords": [
      "duplicates",
      "sort",
      "union all",
      "faster"
    ]
  }
];
