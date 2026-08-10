import { z } from 'zod';
import { jsonResult } from './_format.js';
import { runMultiAgentAnalysis } from '../core/analysis.js';

export function registerAnalysisTools(server) {
  server.tool('analysis_run', 'Run a multi-agent analysis orchestration across chart, market, and strategy lenses', {
    symbol: z.string().optional().describe('Primary symbol to analyze'),
    symbols: z.array(z.string()).optional().describe('Symbols to include in the market-scan phase'),
    timeframe: z.string().optional().describe('Primary timeframe for chart analysis'),
    include: z.array(z.string()).optional().describe('Modules to include: chart, market, strategy'),
    objective: z.string().optional().describe('High-level analysis objective'),
  }, async ({ symbol, symbols, timeframe, include, objective }) => {
    try {
      return jsonResult(runMultiAgentAnalysis({
        symbol,
        symbols,
        timeframe,
        include,
        objective,
      }));
    } catch (err) {
      return jsonResult({ success: false, error: err.message }, true);
    }
  });
}
