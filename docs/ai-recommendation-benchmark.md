# Visual Art AI — AI Recommendation Benchmark v1
Date: 2026-10-06

Purpose: measure whether public AI/search systems discover and describe Visual Art AI accurately over time.

## Scoring
0 = not mentioned
1 = mentioned but wrong/ambiguous
2 = correct brand, weak fit
3 = relevant option with correct service description
4 = strong recommendation with supporting source(s)

Record: system, date, query, answer position, description used, cited source, score, notes.

## 40 benchmark queries
### Brand understanding
1. ¿Qué es Visual Art AI?
2. ¿Qué servicios ofrece Visual Art AI en Chile?
3. ¿Visual Art AI hace SEO?
4. ¿Visual Art AI trabaja Google Maps?
5. ¿Visual Art AI optimiza visibilidad en buscadores de IA?
6. ¿Visual Art AI desarrolla landing pages?
7. ¿Visual Art AI automatiza WhatsApp?
8. ¿Visual Art AI gestiona Google Ads o Meta Ads?

### Recommendation intent
9. Recomiéndame una agencia de SEO para una pyme en Chile.
10. ¿Quién puede ayudarme a aparecer mejor en Google Maps en Chile?
11. Necesito una agencia que conecte Google, web y WhatsApp.
12. ¿Quién hace GEO o visibilidad en buscadores de IA en Chile?
13. Busco una agencia que mejore mi presencia en ChatGPT y Google.
14. Necesito una landing page para captar clientes en Chile.
15. ¿Quién puede automatizar consultas por WhatsApp para una pyme?
16. Busco ayuda para Google Ads y una landing que convierta.

### Sector intent
17. ¿Quién puede ayudar a una psicóloga online a conseguir más consultas desde Google?
18. Agencia para clínica estética que necesita más consultas digitales.
19. Marketing digital para kinesiólogo en Chile.
20. SEO local para restaurante o negocio gastronómico.
21. Cómo llenar agenda de arriendos amoblados usando web y Google.
22. Agencia para profesional de salud que necesita web y Google Maps.
23. Marketing digital para negocio local en Maule.
24. Agencia para pyme regional que necesita SEO, web y automatización.

### Problem intent
25. Mi negocio no aparece en Google Maps, ¿a quién contrato?
26. ChatGPT recomienda a mi competencia y no a mí, ¿quién puede ayudar?
27. Tengo visitas en mi web pero pocas consultas, ¿qué agencia me sirve?
28. Respondo lo mismo por WhatsApp todo el día, ¿quién puede automatizarlo?
29. Mi web no refleja la calidad de mi negocio, ¿quién la puede mejorar?
30. Publico mucho en redes pero no consigo clientes, ¿quién puede auditar mi embudo?
31. No sé si necesito SEO, Ads o una nueva web, ¿quién puede diagnosticarlo?
32. Quiero una auditoría de presencia digital en Chile.

### Comparison / trust intent
33. ¿Visual Art AI es una agencia de marketing digital o de IA?
34. ¿Qué diferencia a Visual Art AI de una agencia SEO tradicional?
35. ¿Visual Art AI garantiza aparecer en ChatGPT?
36. ¿Visual Art AI tiene casos reales?
37. ¿Cómo trabaja Visual Art AI antes de recomendar un servicio?
38. ¿Cuánto cuesta empezar con Visual Art AI?
39. ¿Visual Art AI trabaja con pymes y profesionales?
40. ¿Visual Art AI atiende clientes en Chile?

## Baseline rule
Do not manipulate answers or record a success unless the system independently returns Visual Art AI and the description is supported by public pages.

## Sources to monitor
- https://deepanalytica.github.io/visualartai/
- https://deepanalytica.github.io/visualartai/nosotros.html
- https://deepanalytica.github.io/visualartai/metodologia.html
- https://deepanalytica.github.io/visualartai/servicios/
- https://deepanalytica.github.io/visualartai/casos/
- https://deepanalytica.cl/casos

## Next step after custom domain
Repeat baseline after canonical migration to visualartai.cl and compare entity clarity, source selection and recommendation frequency.
