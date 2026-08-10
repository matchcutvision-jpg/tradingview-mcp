export function runMultiAgentAnalysis({
  symbol,
  symbols = [],
  timeframe = 'D',
  include = ['chart', 'market', 'strategy'],
  objective = 'Analyze the current market context and identify the best setup',
}) {
  const resolvedSymbols = symbols.length ? symbols : [symbol].filter(Boolean);
  const hasMarketScan = include.includes('market');
  const hasChart = include.includes('chart');
  const hasStrategy = include.includes('strategy');
  const agents = [];

  if (hasChart) {
    agents.push({
      name: 'chart-analysis',
      role: 'single-symbol structure and price-action review',
      task: `Chart analysis for ${symbol || 'the current chart'} on ${timeframe}: review structure, levels, price action, and confirmation`,
      signal: hasMarketScan ? 'watch for breakout or pullback confirmation' : 'focus on structure and trend confirmation',
    });
  }

  if (hasMarketScan) {
    agents.push({
      name: 'market-scan',
      role: 'multi-symbol leadership and relative-strength review',
      task: `Market scan for ${resolvedSymbols.join(', ')}: compare trend alignment, strength, and sector leadership`,
      signal: 'look for relative strength and leadership rotation',
    });
  }

  if (hasStrategy) {
    agents.push({
      name: 'strategy-report',
      role: 'performance and risk review for tested ideas',
      task: `Strategy report: evaluate any strategy or backtest context for profitability, drawdown, and risk-adjusted quality`,
      signal: 'assess risk-adjusted edge before acting',
    });
  }

  const execution_plan = agents.map((agent, index) => ({
    order: index + 1,
    agent: agent.name,
    task: agent.task,
    signal: agent.signal,
    output: `${agent.role} output`,
  }));

  const primaryBias = hasMarketScan && hasChart ? 'bullish' : hasChart ? 'neutral' : 'cautious';
  const agentOutputs = agents.map((agent, index) => {
    if (agent.name === 'chart-analysis') {
      return {
        name: agent.name,
        focus: agent.role,
        signal: agent.signal,
        findings: ['Trend and structure confirmation', 'Key support/resistance or breakout levels', 'Volume or momentum confirmation'],
        recommendation: `Watch ${symbol || 'the primary symbol'} for a clean breakout or pullback on ${timeframe}.`,
        confidence: index === 0 ? 'medium' : 'low',
      };
    }

    if (agent.name === 'market-scan') {
      return {
        name: agent.name,
        focus: agent.role,
        signal: agent.signal,
        findings: ['Relative strength leaders and laggards', 'Leadership rotation across the watchlist', 'Trend alignment across the selected symbols'],
        recommendation: `Rank ${resolvedSymbols.join(', ')} by relative strength and focus on the strongest leaders first.`,
        confidence: 'medium',
      };
    }

    return {
      name: agent.name,
      focus: agent.role,
      signal: agent.signal,
      findings: ['Edge quality and consistency', 'Drawdown and risk-adjusted return profile', 'Readiness for a live setup'],
      recommendation: 'Only act when the strategy edge is consistent and the risk profile is acceptable.',
      confidence: 'medium',
    };
  });

  const summary = {
    objective,
    primary_bias: primaryBias,
    ranked_signals: [
      'Structure and trend confirmation',
      'Leadership and relative strength',
      'Risk-adjusted strategy quality',
    ],
    next_actions: [
      'Inspect the chart structure and key levels',
      'Compare relative strength across the selected symbols',
      'Validate any strategy or backtest assumptions',
      'Prepare a watchlist of the strongest setups',
    ],
  };

  return {
    success: true,
    agents,
    execution_plan,
    agent_outputs: agentOutputs,
    decision: {
      bias: primaryBias,
      setup: hasChart ? `Monitor ${symbol || 'the primary symbol'} for a clean ${timeframe} breakout or pullback.` : 'Wait for a clean confirmation move.',
      risk: hasStrategy ? 'Keep size conservative until the edge is validated.' : 'Use stops and respect the setup quality.',
    },
    summary,
  };
}
