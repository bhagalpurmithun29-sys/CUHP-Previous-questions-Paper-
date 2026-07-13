# Playbook: Credential Stuffing Attack

## Detection
Triggered when > 50 failed login attempts originate from a single IP or distributed botnet within 5 minutes.

## Containment
1. Implement IP blocking via WAF/Ingress temporarily.
2. Enable CAPTCHA globally for the `/login` endpoint.
3. Force password resets for any accounts that successfully authenticated during the attack window.

## Eradication
- Review application logs to verify attack cessation.
- Remove temporary IP blocks if attack subsides.

## Lessons Learned
- Analyze if rate-limiting thresholds need adjusting in `threat-detection/rules.yml`.
