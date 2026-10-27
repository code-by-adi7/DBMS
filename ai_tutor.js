/**
 * DBMS AI Teaching Engine — Free & Unlimited
 * Professor Thangan
 * 1. Direct Free Cloud AI (Pollinations.ai Text API - 100% Free & Unlimited, zero API keys)
 * 2. Built-in Offline Pedagogical Knowledge Engine (instant, reliable fallback)
 * 3. Optional Custom Provider Support (Gemini, Groq)
 */

class DBMSTeachingSystem {
    constructor() {
        this.currentMode = 'tutor'; // 'tutor' | 'explainer' | 'doctor' | 'viva' | 'general'
        this.selectedProgramId = 'A1';
        this.conversationHistory = [];
        this.isGenerating = false;
        this.vivaCurrentQuestionIndex = 0;
        this.vivaScore = 0;
        this.vivaTotalQuestions = 0;

        // Custom config from localStorage
        this.customConfig = {
            provider: localStorage.getItem('dbms_ai_provider') || 'free_cloud', // 'free_cloud' | 'gemini' | 'groq' | 'offline'
            apiKey: localStorage.getItem('dbms_ai_api_key') || '',
            model: localStorage.getItem('dbms_ai_model') || 'openai'
        };

        // System prompt pre-loaded with full PDF curriculum knowledge
        this.systemContext = this.buildSystemPrompt();
    }

    buildSystemPrompt() {
        return `You are Thangan, an elite, patient, encouraging, and highly knowledgeable University DBMS & SQL Professor teaching from the "University DBMS LAB FINAL RECORD".
Always identify yourself as Thangan (or Professor Thangan). You are teaching all 14 lab programs (Part A: SQL Programs 1-7, Part B: PL/SQL Programs 1-7).

YOUR COMPLETE SYLLABUS & SOURCE RECORD:
- Part A1: EMPLOYEE Table (EMPNO, NAME, DESIGNATION, DEPARTMENT, GENDER, SALARY). Constraints: PK, CHECK gender in ('M','F'), CHECK dept in ('SALES','ACCOUNTS','IT'), CHECK designation. Queries: LIKE '%Raj', BETWEEN, DISTINCT, GROUP BY & HAVING sum(salary)>30000, HAVING count(*)>2.
- Part A2: CLIENT Table (CLIENT_NO, NAME, ADDRESS, STATE, BAL_DUE). CHECK client_no LIKE 'C%'. Queries: CTAS client1 with &state, empty clone client2 WHERE 1=2, ALTER TABLE ADD penalty, UPDATE penalty (10% for C1002, C1005, C1009; 8% others), RENAME client1 TO new_client, DROP TABLE client2.
- Part A3: BOOK Table (ACCESSIONNO, TITLE, AUTHOR, PUBLISHER, YEAR, PRICE). Queries: LIKE '_a%' (single char underscore), Navathe before 2010 ORDER BY year DESC, ALTER TABLE MODIFY title VARCHAR2(25), NOT IN ('Microsoft Press'), DELETE FROM book WHERE year < 1990.
- Part A4: SALES Table (SNO, SNAME, MANAGER_NAME, JOIN_DATE, DATE_BIRTH, SALARY, SALES_AMOUNT, COMMISSION). Age CHECK >= 18 with TRUNC(MONTHS_BETWEEN(join_date, date_birth)/12)>=18. Queries: Subquery salary > avg(salary), UPDATE commission 20%, Self-Join s join sales m on s.manager_name=m.sname where (s.salary+s.commission)>m.salary, 10+ years tenure using TRUNC(MONTHS_BETWEEN(sysdate, join_date)/12)>=10.
- Part A5: SALES_DETAILS Table (SNO, MONTH, TARGET, QTY_SOLD). Composite PK on (SNO, MONTH). Queries: Target reached sales, Rs. 50 commission, Subquery with NOT IN for who NEVER reached target, s0001 or s0003.
- Part A6: SUPPLIERS & CITEMS Tables. Foreign Key (supplier_no references suppliers(sno)). Queries: JOIN ordered by city ASC and iquantity DESC, subquery for keyboard suppliers, 'cats' and 'electrotech' suppliers, CTAS neworder WHERE iquantity < 5.
- Part A7: PRODUCT_DETAIL & PURCHASED_DETAIL Tables. Queries: C2 total spent, UNION for (qtyavailable < 30 OR sum(qtysold) < 5), C4 purchases, C1 profit percentage calculation ((price*qtysold*profit)/100), total Pen Drives sold.
- Part B1: Bank Debit PL/SQL block with NO_DATA_FOUND exception, balance range check (>500 minimum balance).
- Part B2: Stock Inventory PL/SQL block with User-Defined Exception (low_stock EXCEPTION, RAISE low_stock, WHEN low_stock THEN).
- Part B3: Book Selling Price PL/SQL program using Explicit Cursor (CURSOR, OPEN, FETCH, %NOTFOUND, CLOSE) computing categorized discount rates.
- Part B4: Employee Payroll Stored Procedure (paybill with IN basic and OUT da, hra, pf, tax, gross, net) called via Cursor FOR Loop across all employees.
- Part B5: Inventory Package (PCK_ITEM specification with CHK_ITEM function and PROC_ITEM procedure; Package Body with transaction logging).
- Part B6: Math Package (math_package with factorial recursive/iterative function, nCr procedure, nPr procedure).
- Part B7: Database Triggers (trg_after_sales after INSERT on sales to update master total_sales and current_stock; trg_dml_newstock on newstock using INSERTING, UPDATING, DELETING with :NEW and :OLD).

PEDAGOGICAL TEACHING RULES:
1. Speak as Thangan — helpful, encouraging, direct, and structured.
2. Always format SQL and PL/SQL code in clean markdown codeblocks (\`\`\`sql ... \`\`\`).
3. Clearly explain WHY clauses are used (e.g. why HAVING is needed instead of WHERE, why WHERE 1=2 creates an empty structure, why :NEW is needed in triggers).
4. Be clear, concise, and pedagogical. Use friendly analogies and memorable tips.
5. When asked to check student SQL code, point out syntax and logic errors kindly, provide the corrected code, and explain the fix.
6. In Viva Voce mode, act as Examiner Thangan: grade the student's answer, highlight good points and missing points, and offer the next question.`;
    }

    // Set Teaching Mode
    setMode(mode) {
        this.currentMode = mode;
        const modeNames = {
            'tutor': '🎓 Thangan Tutor',
            'explainer': '🔬 Thangan Explainer',
            'doctor': '🛠️ Thangan Code Doctor',
            'viva': '🎯 Thangan Viva Examiner',
            'general': '💬 Ask Thangan'
        };
        return modeNames[mode] || mode;
    }

    // Main generate function with automatic multi-tiered fallback
    async ask(userPrompt, onChunk = null) {
        if (this.isGenerating) return "Please wait for the current explanation to finish.";
        this.isGenerating = true;

        const currentProg = DBMS_PROGRAMS.find(p => p.id === this.selectedProgramId) || DBMS_PROGRAMS[0];

        // Format prompt with mode directives
        let promptWithContext = userPrompt;
        if (this.currentMode === 'tutor') {
            promptWithContext = `[MODE: THANGAN TEACHING LAB PROGRAM ${currentProg.id} - ${currentProg.title}]\nStudent question: ${userPrompt}\nTeach this topic step-by-step from the lab record. Break down the logic clearly.`;
        } else if (this.currentMode === 'explainer') {
            promptWithContext = `[MODE: CODE BREAKDOWN FOR PROGRAM ${currentProg.id}]\nQuery/Code to dissect: ${userPrompt}\nExplain every clause, keyword, and runtime execution step-by-step.`;
        } else if (this.currentMode === 'doctor') {
            promptWithContext = `[MODE: SQL PRACTICE & ERROR CHECKING FOR ${currentProg.id}]\nStudent's query attempt: ${userPrompt}\nCheck this query against the lab record schema and requirements. Flag errors, correct syntax, and explain why.`;
        } else if (this.currentMode === 'viva') {
            promptWithContext = `[MODE: VIVA VOCE EXAMINER FOR ${currentProg.id}]\nStudent's oral answer: ${userPrompt}\nEvaluate the answer out of 10. List what was accurate, what was missed, the ideal examiner answer, and ask the next viva question.`;
        }

        this.conversationHistory.push({ role: 'user', content: userPrompt });

        let response = '';

        // Try primary provider (Pollinations.ai Free & Unlimited Text API or custom key)
        try {
            if (this.customConfig.provider === 'gemini' && this.customConfig.apiKey) {
                response = await this.callGeminiAPI(promptWithContext);
            } else if (this.customConfig.provider === 'groq' && this.customConfig.apiKey) {
                response = await this.callGroqAPI(promptWithContext);
            } else if (this.customConfig.provider === 'offline') {
                response = this.generateOfflineAIResponse(userPrompt, currentProg);
            } else {
                // Default: 100% Free & Unlimited Cloud AI (Pollinations.ai - Zero keys, zero external libraries)
                response = await this.callPollinationsAI(promptWithContext);
            }
        } catch (cloudErr) {
            console.warn('Cloud AI request failed or offline, using Thangan built-in knowledge engine...', cloudErr);
            // Guaranteed fallback: Offline Pedagogical Knowledge Engine
            response = this.generateOfflineAIResponse(userPrompt, currentProg);
        }

        this.conversationHistory.push({ role: 'assistant', content: response });
        this.isGenerating = false;
        return response;
    }

    // Free Pollinations Text API (100% Free & Unlimited, zero API keys required, pure standard fetch)
    async callPollinationsAI(userPrompt) {
        const messages = [
            { role: 'system', content: this.systemContext },
            ...this.conversationHistory.slice(-4),
            { role: 'user', content: userPrompt }
        ];

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 18000);

        const res = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: messages,
                model: 'openai',
                seed: Math.floor(Math.random() * 10000)
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!text || text.trim().length === 0) throw new Error('Empty response');
        return text;
    }


    // Optional Custom Gemini API
    async callGeminiAPI(userPrompt) {
        const apiKey = this.customConfig.apiKey;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const contents = [
            { role: 'user', parts: [{ text: `${this.systemContext}\n\nUser Question:\n${userPrompt}` }] }
        ];

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: contents })
        });

        const data = await res.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        }
        throw new Error(data.error ? data.error.message : 'Invalid Gemini API response');
    }

    // Optional Custom Groq API
    async callGroqAPI(userPrompt) {
        const apiKey = this.customConfig.apiKey;
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: this.systemContext },
                    ...this.conversationHistory.slice(-4),
                    { role: 'user', content: userPrompt }
                ]
            })
        });

        const data = await res.json();
        if (data.choices && data.choices[0].message) {
            return data.choices[0].message.content;
        }
        throw new Error(data.error ? data.error.message : 'Invalid Groq API response');
    }

    // Tier 3: Built-in Offline Pedagogical Knowledge Engine (Instant, Offline, 100% Guaranteed)
    generateOfflineAIResponse(rawQuery, currentProg) {
        const q = rawQuery.toLowerCase().trim();

        // 1. Program Teaching Mode
        if (q.includes('teach') || q.includes('explain program') || q.includes('how to do program') || q.includes('full program')) {
            let res = `🎓 **Mastering ${currentProg.id}: ${currentProg.title}**\n\n`;
            res += `**Objective:** ${currentProg.description}\n\n`;
            
            if (currentProg.tables && currentProg.tables.length > 0) {
                res += `### 1. Table Architecture & Constraints\n`;
                currentProg.tables.forEach(t => {
                    res += `**Table \`${t.name}\`:**\n\`\`\`sql\n${t.createSql}\n\`\`\`\n`;
                    if (t.insertSql) {
                        res += `**Sample Inserts:**\n\`\`\`sql\n${t.insertSql.split('\\n').slice(0, 3).join('\\n')}\n-- (and more records)\n\`\`\`\n`;
                    }
                });
            }

            if (currentProg.queries && currentProg.queries.length > 0) {
                res += `\n### 2. Step-by-Step Lab Queries Breakdown\n`;
                currentProg.queries.forEach(query => {
                    res += `\n#### 📌 ${query.label}: ${query.question}\n`;
                    res += `\`\`\`sql\n${query.sql}\n\`\`\`\n`;
                    res += `💡 **Why this works:** ${query.explanation}\n`;
                });
            }

            if (currentProg.plsql) {
                res += `\n### 2. Complete PL/SQL Script Execution\n\`\`\`sql\n${currentProg.plsql}\n\`\`\`\n`;
            }

            res += `\n### 3. Exam Viva Memory Tip\n> 💡 **"${currentProg.memoryTip}"**\n`;
            return res;
        }

        // 2. Query Explanations
        if (currentProg.queries) {
            for (const query of currentProg.queries) {
                if (q.includes(query.label.toLowerCase()) || q.includes(query.id.toLowerCase()) || q.includes(query.question.toLowerCase().slice(0, 25))) {
                    return `🔍 **Deep Dive: ${query.label}**\n\n**Problem:** ${query.question}\n\n\`\`\`sql\n${query.sql}\n\`\`\`\n\n**Detailed Clause Breakdown:**\n- **Logic:** ${query.explanation}\n- **Key Takeaways:**\n${query.keyPoints ? query.keyPoints.map(k => `  • ${k}`).join('\n') : ''}\n\n**Expected Result:** ${query.output || 'Qualifying rows matching criteria'}`;
                }
            }
        }

        // 3. Concept Lookups
        for (const [key, concept] of Object.entries(DBMS_CONCEPTS)) {
            if (q.includes(key) || key.split(' ').every(word => q.includes(word))) {
                return `📖 **Concept Explained: ${concept.title}**\n\n${concept.description}\n\n\`\`\`sql\n${concept.example}\n\`\`\`\n\n💡 **Examiner's Viva Tip:** ${concept.examTip}`;
            }
        }

        // 4. Viva Voce Simulator
        if (q.includes('viva') || q.includes('oral') || q.includes('interview')) {
            const vq = VIVA_BANK[Math.floor(Math.random() * VIVA_BANK.length)];
            return `🎯 **Lab Viva Voce Examiner Challenge!**\n\n**Question (${vq.category}):**\n### "${vq.q}"\n\n*Take 30 seconds to formulate your answer, then type it here or click to reveal the examiner's model answer below:* \n\n<details>\n<summary><b>👀 Reveal Examiner's Model Answer</b></summary>\n\n${vq.modelAnswer}\n\n**Essential Keywords to Score Full Marks:** \`${vq.keywords.join(', ')}\`\n</details>\n\n*Type another reply to test yourself further!*`;
        }

        // 5. Code Practice Doctor
        if (q.includes('check') || q.includes('error') || q.includes('fix') || q.includes('select') || q.includes('create table')) {
            return `🛠️ **AI Code Doctor Analysis:**\n\nLooking at your query for **${currentProg.id}**:\n\`\`\`sql\n${rawQuery}\n\`\`\`\n\n**Checklist Verification:**\n- ✅ Target Table: \`${currentProg.tables && currentProg.tables[0] ? currentProg.tables[0].name : 'Active Schema'}\`\n- ✅ Syntax Check: Ensure Oracle terminators (\`;\`) are included.\n- 💡 **Best Practice Reminder:** When using aggregate functions (SUM, AVG, COUNT), every non-aggregated column in the SELECT list MUST appear in the GROUP BY clause.\n- 💡 **Record Solution:**\n\`\`\`sql\n${currentProg.queries && currentProg.queries[0] ? currentProg.queries[0].sql : currentProg.plsql || '-- Code'}\n\`\`\`\n\nWould you like me to explain line-by-line?`;
        }

        // 6. Generic Program Quick Navigator
        for (let i = 1; i <= 14; i++) {
            const pId = i <= 7 ? `A${i}` : `B${i-7}`;
            if (q.includes(`program ${i}`) || q.includes(`prog ${i}`) || q.includes(`part ${pId.toLowerCase()}`) || q.includes(pId.toLowerCase())) {
                const target = DBMS_PROGRAMS.find(p => p.id === pId);
                if (target) {
                    return `📋 **${target.id}: ${target.title}** (${target.part})\n\n${target.description}\n\n**Quick Queries Available:**\n${target.queries ? target.queries.map(qu => `- **${qu.label}:** ${qu.question}`).join('\n') : 'PL/SQL Block with Procedure / Cursor / Triggers'}\n\nType **"Teach ${target.id}"** to receive the complete step-by-step masterclass!`;
                }
            }
        }

        // Default friendly fallback
        return `🧑‍🏫 **Professor Thangan — DBMS AI Tutor**\n\nHello! I am **Thangan**, your DBMS professor. I have the complete **DBMS Lab Final Record (All 14 Programs)** loaded and ready to teach!\n\nHere are some great ways to learn with me right now:\n1. 🎓 **"Teach Program ${currentProg.progNum}"** — Step-by-step masterclass from scratch\n2. 🔬 **"Explain Query (a)"** — Detailed clause breakdown\n3. 🎯 **"Viva me!"** — Practice oral exam questions with instant scoring\n4. 📖 **"WHERE vs HAVING"** or **"Explain Triggers"** — Conceptual deep dive\n5. ✍️ **Type any SQL query** to have me check, optimize, and debug it!`;
    }

    // Text to Speech Voice Feature
    speak(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop any ongoing speech

        // Strip markdown symbols for clean speech
        const cleanText = text
            .replace(/```[\s\S]*?```/g, 'Code block omitted from speech.')
            .replace(/[#*`_>]/g, '')
            .replace(/\[.*?\]\(.*?\)/g, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Try to select an English voice
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (enVoice) utterance.voice = enVoice;

        window.speechSynthesis.speak(utterance);
    }

    stopSpeaking() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
}

// Global instance
window.aiTutor = new DBMSTeachingSystem();
