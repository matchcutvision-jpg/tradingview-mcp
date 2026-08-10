#!/usr/bin/env node

import { register } from '../router.js';
import { runMultiAgentAnalysis } from '../../core/analysis.js';

register('analysis', {
  description: 'Run a multi-agent market analysis workflow across chart, market, and strategy lenses',
  options: {
    symbol: { type: 'string', description: 'Primary symbol to analyze' },
    symbols: { type: 'string', description: 'Comma-separated symbols for market scan' },
    timeframe: { type: 'string', description: 'Primary timeframe (default: D)' },
    include: { type: 'string', description: 'Comma-separated modules: chart,market,strategy' },
    objective: { type: 'string', description: 'High-level analysis objective' },
  },
  handler: async (values) => {
    const symbols = values.symbols ? values.symbols.split(',').map(s => s.trim()).filter(Boolean) : [];
    const include = values.include ? values.include.split(',').map(s => s.trim()).filter(Boolean) : ['chart', 'market', 'strategy'];
    return runMultiAgentAnalysis({
      symbol: values.symbol || 'AAPL',
      symbols,
      timeframe: values.timeframe || 'D',
      include,
      objective: values.objective || 'Analyze the current market context and identify the best setup',
    });
  },
});
