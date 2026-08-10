import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { runMultiAgentAnalysis } from '../src/core/analysis.js';

describe('multi-agent analysis orchestration', () => {
  it('builds a complete plan for chart, market, and strategy analyses', () => {
    const result = runMultiAgentAnalysis({
      symbol: 'AAPL',
      symbols: ['AAPL', 'MSFT', 'NVDA'],
      timeframe: 'D',
      include: ['chart', 'market', 'strategy'],
      objective: 'Find the strongest trend-following setup and compare leadership',
    });

    assert.equal(result.success, true);
    assert.deepEqual(result.agents.map(agent => agent.name), ['chart-analysis', 'market-scan', 'strategy-report']);
    assert.equal(result.execution_plan.length, 3);
    assert.match(result.execution_plan[0].task, /chart/i);
    assert.match(result.execution_plan[1].task, /market/i);
    assert.match(result.execution_plan[2].task, /strategy/i);
    assert.equal(result.summary.primary_bias, 'neutral');
    assert.ok(result.summary.next_actions.length >= 3);
  });
});
