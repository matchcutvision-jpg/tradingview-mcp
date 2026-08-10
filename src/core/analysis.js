export function runMultiAgentAnalysis({
  symbol,
  symbols = [],
  timeframe = 'D',
  include = ['chart', 'market', 'strategy'],
  objective = 'Analyze the current market context and identify the best setup',
}) {
  const agents = [];

  if (include.includes('chart')) {
    agents.push({
      name: 'chart-analysis',
      role: 'single-symbol structure and price-action review',
      task: `Chart analysis for ${symbol || 'the current chart'} on ${timeframe}: review structure, levels, price action, and confirmation`,
    });
  }

  if (include.includes('market')) {
    agents.push({
      name: 'market-scan',
      role: 'multi-symbol leadership and relative-strength review',
      task: `Market scan for ${symbols.length ? symbols.join(', ') : 'the selected watchlist'}: compare trend alignment, strength, and sector leadership`,
    });
  }

  if (include.includes('strategy')) {
    agents.push({
      name: 'strategy-report',
      role: 'performance and risk review for tested ideas',
      task: `Strategy report: evaluate any strategy or backtest context for profitability, drawdown, and risk-adjusted quality`,
    });
  }

  const execution_plan = agents.map((agent, index) => ({
    order: index + 1,
    agent: agent.name,
    task: agent.task,
    output: `${agent.role} output`,
  }));

  const summary = {
    objective,
    primary_bias: 'neutral',
    next_actions: [
      'Inspect the chart structure and key levels',
      'Compare relative strength across the selected symbols',
      'Validate any strategy or backtest assumptions',
    ],
  };

  return {
    success: true,
    agents,
    execution_plan,
    summary,
  };
}
