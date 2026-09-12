const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Page dimensions (Letter / A4)
  const width = 612;
  const height = 792;
  const margin = 40;
  const contentWidth = width - margin * 2;

  let page = pdfDoc.addPage([width, height]);
  let y = height - margin;

  const colorBlack = rgb(0.1, 0.1, 0.1);
  const colorGray = rgb(0.35, 0.35, 0.35);
  const colorDarkGray = rgb(0.2, 0.2, 0.2);

  function checkPageSpace(needed) {
    if (y - needed < margin) {
      page = pdfDoc.addPage([width, height]);
      y = height - margin;
    }
  }

  function drawSectionHeader(title) {
    checkPageSpace(30);
    y -= 10;
    page.drawText(title, {
      x: margin,
      y: y,
      size: 11,
      font: fontBold,
      color: colorBlack,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: width - margin, y: y },
      thickness: 1,
      color: colorBlack,
    });
    y -= 12;
  }

  function wrapText(text, fontSize, font, maxW) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (lineWidth <= maxW) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // --- HEADER ---
  // Name
  page.drawText('SUBHADIP CHOWDHURY', {
    x: width / 2 - fontBold.widthOfTextAtSize('SUBHADIP CHOWDHURY', 18) / 2,
    y: y,
    size: 18,
    font: fontBold,
    color: colorBlack,
  });
  y -= 18;

  // Subtitle
  const subText = 'AI SOLUTIONS ENGINEER | AGENTIC AI, BUSINESS INTELLIGENCE & ENTERPRISE AUTOMATION';
  page.drawText(subText, {
    x: width / 2 - fontBold.widthOfTextAtSize(subText, 9) / 2,
    y: y,
    size: 9,
    font: fontBold,
    color: colorGray,
  });
  y -= 14;

  // Contact Info
  const contactText = 'Kol-157, West Bengal, India  •  +91 7908309248  •  subhadipchowdhury1998@gmail.com  •  linkedin.com/in/subho98';
  page.drawText(contactText, {
    x: width / 2 - fontRegular.widthOfTextAtSize(contactText, 8.5) / 2,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorGray,
  });
  y -= 14;

  // --- PROFESSIONAL SUMMARY ---
  drawSectionHeader('PROFESSIONAL SUMMARY');
  const summaryText = 'AI Solutions Engineer with 5+ years of enterprise technology experience across banking and infrastructure environments, spanning business intelligence, large-scale automation, and agentic AI systems. Currently building production LangGraph agents with Model Context Protocol (MCP) tool integrations for automated infrastructure remediation, backed by a solid foundation in Power BI reporting, SQL/ETL pipelines, and endpoint automation across 20,000+ systems. Comfortable owning a problem end-to-end — from data modeling and dashboard design to agent architecture and the database schema that tracks execution state and audit history.';
  const summaryLines = wrapText(summaryText, 9, fontRegular, contentWidth);
  for (const line of summaryLines) {
    checkPageSpace(12);
    page.drawText(line, {
      x: margin,
      y: y,
      size: 9,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 12;
  }
  y -= 4;

  // --- TECHNICAL EXPERTISE ---
  drawSectionHeader('TECHNICAL EXPERTISE');
  const expertise = [
    { label: 'Agentic AI & Orchestration: ', val: 'LangGraph (state graphs, checkpointing, time-travel debugging), Model Context Protocol (MCP) tools & connectors, human-in-the-loop workflows, Claude Code' },
    { label: 'Data Engineering & Databases: ', val: 'SQL, PostgreSQL, star schema design, ETL design, data modeling, query optimization' },
    { label: 'Business Intelligence & Ops: ', val: 'Power BI (DAX, star schema modeling, row-level security, incremental refresh, enterprise deployments)' },
    { label: 'Programming & Scripting: ', val: 'Python (Asyncio, Pydantic, REST APIs), PowerShell, Power Automate, Bash' },
    { label: 'Cloud & Enterprise Infra: ', val: 'Azure Data Lake, AWS S3, Oracle, Windows Server, Linux (RHCSA), ServiceNow CMDB' },
  ];

  for (const exp of expertise) {
    checkPageSpace(14);
    const labelW = fontBold.widthOfTextAtSize(exp.label, 9);
    page.drawText(exp.label, {
      x: margin,
      y: y,
      size: 9,
      font: fontBold,
      color: colorBlack,
    });

    const valLines = wrapText(exp.val, 9, fontRegular, contentWidth - labelW);
    page.drawText(valLines[0], {
      x: margin + labelW,
      y: y,
      size: 9,
      font: fontRegular,
      color: colorDarkGray,
    });
    y -= 12;

    for (let i = 1; i < valLines.length; i++) {
      checkPageSpace(12);
      page.drawText(valLines[i], {
        x: margin,
        y: y,
        size: 9,
        font: fontRegular,
        color: colorDarkGray,
      });
      y -= 12;
    }
  }
  y -= 4;

  // --- PROFESSIONAL EXPERIENCE ---
  drawSectionHeader('PROFESSIONAL EXPERIENCE');

  // Job 1
  checkPageSpace(30);
  page.drawText('AI Solutions Engineer', {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: colorBlack,
  });
  const company1 = ' — DXC Technology';
  const job1TitleW = fontBold.widthOfTextAtSize('AI Solutions Engineer', 10);
  page.drawText(company1, {
    x: margin + job1TitleW,
    y: y,
    size: 10,
    font: fontRegular,
    color: colorBlack,
  });

  const dates1 = 'Mar 2025 – Present';
  page.drawText(dates1, {
    x: width - margin - fontOblique.widthOfTextAtSize(dates1, 9.5),
    y: y,
    size: 9.5,
    font: fontOblique,
    color: colorGray,
  });
  y -= 13;

  const tech1 = 'LangGraph, MCP, Python, PostgreSQL, REST APIs';
  page.drawText(tech1, {
    x: margin,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: colorGray,
  });
  y -= 12;

  const bullets1 = [
    'Building an agent-based patch remediation workflow in LangGraph — the agent checks patch compatibility, evaluates vulnerability risk, and applies updates automatically, with a mandatory human approval step before anything high-risk goes through.',
    'Designed the PostgreSQL schema that stores agent run history, node-by-node execution state, and checkpoints, so any run can be replayed or audited after the fact.',
    'Built custom MCP tools so the agent can query vulnerability databases and pull live system status without hardcoding a separate integration for every data source.',
    'Added retry and fallback logic for failed steps, and set up conditional routing so the agent escalates to a person instead of guessing when it hits an edge case.',
    'Use Claude Code day to day to prototype and test new agent modules faster before they go into the production pipeline.',
  ];

  for (const b of bullets1) {
    const lines = wrapText(`•  ${b}`, 9, fontRegular, contentWidth - 10);
    for (let i = 0; i < lines.length; i++) {
      checkPageSpace(12);
      page.drawText(lines[i], {
        x: i === 0 ? margin : margin + 12,
        y: y,
        size: 9,
        font: fontRegular,
        color: colorBlack,
      });
      y -= 12;
    }
  }
  y -= 8;

  // Job 2
  checkPageSpace(30);
  page.drawText('Senior Analyst — BI & Enterprise Automation', {
    x: margin,
    y: y,
    size: 10,
    font: fontBold,
    color: colorBlack,
  });
  const company2 = ' — DXC Technology';
  const job2TitleW = fontBold.widthOfTextAtSize('Senior Analyst — BI & Enterprise Automation', 10);
  page.drawText(company2, {
    x: margin + job2TitleW,
    y: y,
    size: 10,
    font: fontRegular,
    color: colorBlack,
  });

  const dates2 = 'Jan 2021 – Mar 2025';
  page.drawText(dates2, {
    x: width - margin - fontOblique.widthOfTextAtSize(dates2, 9.5),
    y: y,
    size: 9.5,
    font: fontOblique,
    color: colorGray,
  });
  y -= 13;

  const tech2 = 'Power BI, DAX, SQL, PowerShell, ServiceNow, Azure Data Lake';
  page.drawText(tech2, {
    x: margin,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: colorGray,
  });
  y -= 12;

  const bullets2 = [
    'Built and maintained Power BI dashboards (DORM platform) covering incidents, problems, changes, and service requests, rolled out to 100+ enterprise accounts.',
    'Wrote DAX measures for ticket aging, reassignment counts, and SLA compliance that cut recurring manual reporting work by about 40%.',
    'Set up automated ingestion pipelines from Azure Data Lake and Oracle for CMDB assets, job health, and CPU/memory telemetry, cutting manual reporting effort by roughly 35%.',
    'Wrote PowerShell scripts to detect and remove unauthorized software across 20,000+ endpoints, saving an estimated 135 FTE-hours of manual audit work.',
    'Applied row-level security in Power BI so each client account only sees its own data, across 100+ concurrent customer deployments.',
  ];

  for (const b of bullets2) {
    const lines = wrapText(`•  ${b}`, 9, fontRegular, contentWidth - 10);
    for (let i = 0; i < lines.length; i++) {
      checkPageSpace(12);
      page.drawText(lines[i], {
        x: i === 0 ? margin : margin + 12,
        y: y,
        size: 9,
        font: fontRegular,
        color: colorBlack,
      });
      y -= 12;
    }
  }
  y -= 4;

  // --- EDUCATION ---
  drawSectionHeader('EDUCATION');
  const eduItems = [
    { degree: 'B.Tech, Computer Engineering', school: ' — A.I.E.M, Hooghly', dates: '2016–2020  •  DGPA 7.53' },
    { degree: 'Higher Secondary (Science)', school: ' — Burdwan C.M.S High School', dates: '2014–2016  •  85.0%' },
  ];

  for (const item of eduItems) {
    checkPageSpace(14);
    page.drawText(item.degree, {
      x: margin,
      y: y,
      size: 9.5,
      font: fontBold,
      color: colorBlack,
    });
    const degW = fontBold.widthOfTextAtSize(item.degree, 9.5);
    page.drawText(item.school, {
      x: margin + degW,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    page.drawText(item.dates, {
      x: width - margin - fontRegular.widthOfTextAtSize(item.dates, 9),
      y: y,
      size: 9,
      font: fontRegular,
      color: colorGray,
    });
    y -= 14;
  }
  y -= 4;

  // --- CERTIFICATIONS ---
  drawSectionHeader('CERTIFICATIONS');
  const certs = [
    '•  RHCSA — Red Hat Certified System Administrator',
    '•  Oracle Cloud Data Management (2022, 2023)',
  ];
  for (const c of certs) {
    checkPageSpace(13);
    page.drawText(c, {
      x: margin,
      y: y,
      size: 9,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 13;
  }
  y -= 4;

  // --- HONORS ---
  drawSectionHeader('HONORS');
  const honors = [
    '•  Champion Award FY26 H1 — Diamond Excellence Award',
    '•  Champ Award (FY24 Q4, FY23 Q1/Q4)',
    '•  Portfolio Star Runner-Up FY23',
  ];
  for (const h of honors) {
    checkPageSpace(13);
    page.drawText(h, {
      x: margin,
      y: y,
      size: 9,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 13;
  }

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(__dirname, '..', 'public', 'Resume.pdf');
  fs.writeFileSync(targetPath, pdfBytes);
  console.log('PDF generated successfully at:', targetPath);
}

createResume().catch(console.error);
