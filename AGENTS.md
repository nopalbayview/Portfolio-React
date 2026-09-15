# Token Optimization Rules
You have access to `rtk` (Rust Token Killer) on this system.

RTK di Windows HANYA membungkus file executable berekstensi .exe yang ada di PATH (seperti git, npm, php, composer, cargo).

Aturan Penggunaan:
1. Selalu awali dengan `rtk` HANYA untuk program binary .exe:
   - `rtk git status`
   - `rtk git diff`
   - `rtk npm test`
   - `rtk cargo check`
2. JANGAN PERNAH gunakan `rtk` untuk perintah internal shell/PowerShell/CMD:
   - DILARANG: `rtk dir`, `rtk ls`, `rtk Get-ChildItem`, `rtk cd`, `rtk cat`
   - Untuk navigasi dan melihat isi folder, gunakan tool file bawaan atau jalankan langsung tanpa RTK (misalnya: `dir` atau `Get-ChildItem`).