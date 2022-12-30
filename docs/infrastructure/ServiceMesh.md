It's a network (mesh) of all your services through a special proxy (2016). You can use many services or you can create services such a proxy,
monitoring, SSR, any serverless services - all that would be aggregate into a network (mesh) which called Service Mesh.
To manipulate and monitoring these you can use additional service - service mesh controller. In the table bellow you can
see that as a proxy or side car instruments. They are transparent proxies to add functionalities of detection of
services, routing, working on declines\errors and accessibility in a cloud network.

Some people says about mTLS (mutual TLS) - that is the wrong name I saw first in 2020 year. Actually TLS provide
checking a Server Certificate AND an User Certificate. The Certificate checking can be on both sides at once time or on
a Client only. That means that firstly a Client system would check a Server Certificate and then a Server will check a
Client Certificate (if it was configured in a server application as required thing).
And this schema used to mutual authenticate and crypt the channel between users in SSL and TLS next.

And, No, mutual authentication should not be realized separately from a Web server (only when you planning to get some
experiments with your web servers or your application so big as a Java application). Actually, I used once (in ~2008) a
realizsation with the TLS as a separated server, because internal infrastracture should have been connected with users
only through the encrypted channel and it would be extra expensive pleasure to adopt all our servers to use GOST
Certificates.
But, we have a minus in this configuration - balancing task by geolocation is not solved , because the buttle neck will
be this TLS Server.

So, Service Mesh - it is about separation your Application and an Infrastructure. It give you balancing, caching,
monitoring, detecting of intrusions, and many tasks.

|                                               | Kubernetes Ingress                                                              | NGINX Ingress                                                                   | Kong Ingress                                                                                    | Traefik                                                                 | HAproxy                                                                                    | Voyager                                                                                    | Contour                                                                         | Istio Ingress                                                                                          | Ambassador                                                                      | Gloo                                                     | Skipper                                       | Linkerd        |
|:----------------------------------------------|:--------------------------------------------------------------------------------|:--------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------|:---------------------------------------------------------|:----------------------------------------------|:---------------|
| Protocols                                     | http/https, http2, grpc, tcp/udp (partial)                                      | http/https, http2, grpc, tcp/udp                                                | http/https, http2, grpc, tcp (l4)                                                               | http/https, http2 (h2c), grpc, tcp, tcp+tls                             | http/https, http2, grpc, tcp, tcp+tls                                                      | http/https, http2, grpc, tcp, tcp+tls                                                      | http/https, http2, grpc, tcp/udp, tcp+tls                                       | http/https, http2, grpc, tcp/udp, tcp+tls, mongo, mysql, redis                                         | http/https, http2, grpc, tcp/udp, tcp+tls                                       | http/https, http2, grpc, tcp, tcp+tls                    | http/https                                    | null           |
| Based on                                      | nginx                                                                           | nginx/nginx plus                                                                | nginx                                                                                           | traefik                                                                 | haproxy                                                                                    | haproxy                                                                                    | envoy                                                                           | envoy                                                                                                  | envoy                                                                           | envoy                                                    | —                                             | linkerd2-proxy |
| Traffic routing                               | host, path (with regex)                                                         | host, path, header, method, query param (all with regex expect host)            | host, path, method, header\*                                                                    | host (regex), path (regex), headers (regex), query, path prefix, method | host, path                                                                                 | host, path                                                                                 | host, path                                                                      | host, path, method, header (all with regex)                                                            | host, path, method, header (all with regex)                                     | host, path, method, header, query param (all with regex) | host, path, method, header (all with regex)   | null           |
| Namespace limitations                         | All cluster or specified namespaces                                             | All cluster or specified namespaces                                             | Specified namespace                                                                             | All cluster or specified namespaces                                     | All cluster or specified namespaces                                                        | All cluster or specified namespaces                                                        | All cluster or specified namespaces                                             | All cluster or specified namespaces                                                                    | All cluster or specified namespaces                                             | All cluster or specified namespaces                      | All cluster or specified namespaces           | null           |
| Traffic distribution                          | canary, a/b (cookie balancing)                                                  | canary, a/b (routing rules), blue-green (service in the upstream)               | canary, acl, blue-green, proxy caching\*                                                        | canary, blue-green, shadowing                                           | blue-green, shadowing                                                                      | canary, blue-green, acl                                                                    | canary, blue-green                                                              | canary, a/b, shadowing, http headers, acl, whitelist                                                   | canary, a/b, shadowing, http headers, acl, whitelist                            | canary, shadowing                                        | canary, a/b, blue-green, shadowing, whitelist | null           |
| Upstream probes                               | retry, timeouts                                                                 | retry, timeouts, active health checks (based on http probe for pod)\*           | active, circuit breaker                                                                         | retry, timeouts, active, circuit breaker                                | check-uri, check-address, check-port                                                       | haproxy healthchecks                                                                       | timeouts, active                                                                | retry, timeouts, active checks, circuit breakers                                                       | retry, timeouts, active checks, circuit breakers                                | retry, timeouts, circuit breakers                        | retry, timeouts, circuit breaker              | null           |
| Load balancing                                | round-robin, sticky sessions, least-conn, ip-hash, ewma                         | round-robin, least-conn, ip-hash, hash, random, least-time\*, sticky sessions\* | weighted-round-robin, sticky sessions                                                           | weighted-round-robin, dynamic-round-robin, sticky sessions              | round-robin, static-rr, leastconn, first, source, uri, url\_param, header, sticky sessions | round-robin, static-rr, leastconn, first, source, uri, url\_param, header, sticky sessions | round-robin, sticky sessions, weighted-least-request, ring hash, maglev, random | round-robin, sticky sessions, weighted-least-request, ring hash, maglev, random, limit conn, limit req | round-robin, sticky sessions, weighted-least-request, ring hash, maglev, random | round-robin, sticky sessions, least request, random      | round-robin, sticky sessions, random          | null           |
| Authentication                                | Basic, Client cert, external Basic, external OAuth                              | -                                                                               | Basic, HMAC, Key, LDAP, OAuth 2.0, PASETO, OpenID Connect\**                                    | Basic, auth-url, auth-tls, external auth                                | Basic, OAuth, Auth TLS                                                                     | Basic, OAuth, auth-tls, OAuth Google, OAuth GitHub                                         | -                                                                               | Basic, mutual tls, OpenID, custom auth                                                                 | Basic, external auth, OAuth, OpenID                                             | Basic\*, external auth\*, OAuth\*, OpenID\*, LDAP\*      | Basic, OAuth, OpenID                          | null           |
| Paid subscription                             | -                                                                               | +                                                                               | +                                                                                               | +                                                                       | +                                                                                          | +                                                                                          | -                                                                               | -                                                                                                      | +                                                                               | +                                                        | -                                             | null           |
| GUI                                           | -                                                                               | + \* \**                                                                        | + \* \**                                                                                        | +                                                                       | -                                                                                          | -                                                                                          | -                                                                               | -                                                                                                      | -                                                                               | + \*                                                     | -                                             | null           |
| JWT validation                                | -                                                                               | + \*                                                                            | + \**                                                                                           | -                                                                       | + \**                                                                                      | -                                                                                          | -                                                                               | +                                                                                                      | + \*                                                                            | + \*                                                     | +                                             | null           |
| Basic DDoS protection                         | rate limit, limit conn, liimt rps, limit rpm, limit-rate-after, limit-whitelist | max-conns, rate limit, rate-limits (with custom annotations)                    | advanced rate limit\*, rate limit, request size limit, request termination, response rate limit | max-conns, rate limit, ip whitelist                                     | limit-rps, limit-connections, limit-whitelist                                              | max-conns, rate limit, whitelist                                                           | max-conns, max-request                                                          | acl, whitelist, rate limit                                                                             | rate limit, load shedding                                                       | rate limit\*                                             | rate limit                                    | null           |
| Requests tracing                              | +                                                                               | +                                                                               | +                                                                                               | +                                                                       | -                                                                                          | -                                                                                          | -                                                                               | +                                                                                                      | +                                                                               | +                                                        | +                                             | null           |
| Config customization                          | +                                                                               | +                                                                               | +                                                                                               | +                                                                       | +                                                                                          | +                                                                                          | -                                                                               | +                                                                                                      | -                                                                               | -                                                        | +                                             | null           |
| WAF                                           | lua-resty-waf, ModSecurity                                                      | + \*                                                                            | Wallarm                                                                                         | -                                                                       | ModSecurity                                                                                | -                                                                                          | -                                                                               | ModSecurity                                                                                            | -                                                                               | ModSecurity\*                                            | -                                             | null           |
| GitHub: stars commits (contributors) releases | 8900 5574 (582) 110                                                             | 2900 871 (57) 44                                                                | 1230 791 (71) 27                                                                                | 31400 3791 (560) 316                                                    | 664 1131 (39) 101                                                                          | 1248 1323 (64) 86                                                                          | 2517 2925 (119) 55                                                              | 24900 13945 (640) 170                                                                                  | 3024 15069 (162) 547                                                            | 2646 1414 (67) 330                                       | 2300 1786 (104) 668                           | null           |

\* In paid version only.
\** Module is available.