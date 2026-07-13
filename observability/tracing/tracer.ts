/**
 * Distributed Tracing Configuration
 * Implements OpenTelemetry trace context propagation.
 */
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export const initTracer = (serviceName: string) => {
  const provider = new NodeTracerProvider();
  
  // Exporter pointing to an OTLP collector (Jaeger/Zipkin/DataDog)
  const exporter = new OTLPTraceExporter({
    url: process.env.OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  });
  
  // Configurable sampling would be added here
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  provider.register();
  
  return provider.getTracer(serviceName);
};
