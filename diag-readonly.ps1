$base='http://127.0.0.1:4185'
try { Invoke-RestMethod "$base/api/operations" -Method Get | ConvertTo-Json -Depth 8 } catch { $_.Exception.Message }
try { Invoke-RestMethod "$base/api/home" -Method Get | ConvertTo-Json -Depth 8 } catch { $_.Exception.Message }
try { Invoke-RestMethod "$base/api/inspections" -Method Get | ConvertTo-Json -Depth 8 } catch { $_.Exception.Message }
