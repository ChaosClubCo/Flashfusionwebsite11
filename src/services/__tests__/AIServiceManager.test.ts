import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AIServiceManager, AIProvider } from '../AIServiceManager';

const mockProvider: AIProvider = {
  name: 'TestProvider',
  apiKey: 'test-key',
  baseUrl: 'https://example.com',
  models: ['test-model'],
  capabilities: ['text-generation'],
  rateLimits: {
    requestsPerMinute: 100,
    tokensPerMinute: 1000
  }
};

const mockProviderResponse = {
  content: 'generated content',
  model: 'test-model',
  usage: {
    promptTokens: 10,
    completionTokens: 20,
    totalTokens: 30
  }
};

describe('AIServiceManager helper methods', () => {
  let manager: AIServiceManager;

  beforeEach(() => {
    manager = new AIServiceManager();
    vi.spyOn(manager as any, 'selectOptimalProvider').mockResolvedValue(mockProvider);
    vi.spyOn(manager as any, 'checkRateLimit').mockReturnValue(true);
    vi.spyOn(manager as any, 'logUsage').mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('generateCode delegates to the unified generator with a full AIRequest', async () => {
    const callProviderSpy = vi.spyOn(manager as any, 'callProvider').mockResolvedValue(mockProviderResponse);

    const result = await manager.generateCode('Build an API', 'typescript');

    expect(callProviderSpy).toHaveBeenCalledTimes(1);
    const [, requestArg] = callProviderSpy.mock.calls[0];
    expect(requestArg).toMatchObject({
      prompt: 'Build an API',
      temperature: 0.2,
      maxTokens: 6000
    });
    expect(requestArg.systemPrompt).toContain('expert software developer');
    expect(result).toMatchObject({
      content: mockProviderResponse.content,
      model: mockProviderResponse.model,
      provider: mockProvider.name
    });
  });

  it('generateContentForType builds the content prompt without recursion', async () => {
    const callProviderSpy = vi.spyOn(manager as any, 'callProvider').mockResolvedValue(mockProviderResponse);

    const result = await manager.generateContentForType('Write a blog post', 'blog');

    expect(callProviderSpy).toHaveBeenCalledTimes(1);
    const [, requestArg] = callProviderSpy.mock.calls[0];
    expect(requestArg).toMatchObject({
      prompt: 'Write a blog post',
      temperature: 0.8,
      maxTokens: 4000
    });
    expect(requestArg.systemPrompt).toContain('professional content creator');
    expect(result.provider).toBe(mockProvider.name);
    expect(result.content).toBe(mockProviderResponse.content);
  });

  it('throws when no providers are available', async () => {
    vi.spyOn(manager as any, 'selectOptimalProvider').mockResolvedValue(null);

    await expect(manager.generateContent({ prompt: 'test prompt' })).rejects.toThrow('No available AI providers configured');
  });
});
