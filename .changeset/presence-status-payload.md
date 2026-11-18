---
'@yas chat/meteor': patch
'@yas chat/models': patch
'@yas chat/model-typings': patch
'@yas chat/abac': patch
---

Fixes the presence service crashing in microservices deployments when a user who belongs to many rooms connects or disconnects. Apps that listen to `IPostUserStatusChanged` again receive only the user's identity, roles and status fields, as before 8.6.0.
