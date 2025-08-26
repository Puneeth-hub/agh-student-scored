export function computeWeightedReadiness({ aptitude, coding, resume, mock }, weights) {
  // ensure default weights
  const w = {
    aptitude: (weights?.aptitude ?? 0.25),
    coding: (weights?.coding ?? 0.4),
    resume: (weights?.resume ?? 0.2),
    mock: (weights?.mock ?? 0.15)
  };

  const a = aptitude?.value ?? 0;
  const c = coding?.value ?? 0;
  const r = resume?.value ?? 0;
  const m = mock?.value ?? 0;

  const readinessPercent = a * w.aptitude + c * w.coding + r * w.resume + m * w.mock;
  const breakdown = {
    aptitude: { value: a, details: aptitude?.details ?? {} },
    coding: { value: c, details: coding?.details ?? {} },
    resume: { value: r, details: resume?.details ?? {} },
    mock: { value: m, details: mock?.details ?? {} },
  };

  return { readinessPercent: Number(readinessPercent.toFixed(2)), breakdown, weights: w };
}

export function generateImprovementPlan(breakdown) {
  // Simple rule-based plan generator. Customize thresholds/phrases as needed.
  const plan = [];

  // Aptitude
  const a = breakdown.aptitude?.value ?? 0;
  const aDetails = breakdown.aptitude?.details ?? {};
  if (a < 60) {
    if ((aDetails.speed ?? 0) < 60) plan.push("Improve aptitude speed (practice timed tests)");
    if ((aDetails.accuracy ?? 100) < 70) plan.push("Improve aptitude accuracy (review fundamental concepts)");
    if (plan.length === 0) plan.push("Practice general aptitude tests (quant & reasoning)");
  } else if (a < 75) {
    plan.push("Increase aptitude speed and consistency with timed mocks");
  }

  // Coding
  const c = breakdown.coding?.value ?? 0;
  const cDetails = breakdown.coding?.details ?? {};
  if (c < 60) {
    if ((cDetails.dsa ?? 0) < 60) plan.push("Strengthen DSA basics: arrays, strings, linked lists, recursion");
    if ((cDetails.systems ?? 100) < 60) plan.push("Work on system design fundamentals and practice end-to-end problems");
    plan.push("Solve targeted coding problems on platforms (medium difficulty)");
  } else if (c < 75) {
    plan.push("Practice timed coding tests and optimize solutions");
  }

  // Resume
  const r = breakdown.resume?.value ?? 0;
  const rDetails = breakdown.resume?.details ?? {};
  if (r < 70) {
    if ((rDetails.projects ?? 0) < 70) plan.push("Strengthen resume: add clear project descriptions, outcomes, and technologies used");
    if ((rDetails.format ?? 0) < 70) plan.push("Improve resume format: concise bullets and metrics (use action verbs)");
    plan.push("Get resume feedback and iterate");
  }

  // Mock Interview
  const m = breakdown.mock?.value ?? 0;
  const mDetails = breakdown.mock?.details ?? {};
  if (m < 60) {
    if ((mDetails.communication ?? 0) < 60) plan.push("Improve communication & behavioral answers (STAR method)");
    if ((mDetails.problemSolving ?? 0) < 60) plan.push("Practice problem explanation and step-by-step thinking in interviews");
    plan.push("Schedule regular mock interviews and collect feedback");
  } else if (m < 75) {
    plan.push("Refine interview delivery and technical explanation clarity");
  }

  
  const unique = [...new Set(plan)].slice(0, 6);
  if (unique.length === 0) unique.push("Maintain current progress and keep practicing regularly");

  return unique;
}
