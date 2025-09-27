@echo off
setlocal enabledelayedexpansion

echo Removing Zone.Identifier streams...

for /r %%f in (*.jpg *.jpeg *.png *.svg *.zip) do (
    if exist "%%f:Zone.Identifier" (
        echo Removing: %%f:Zone.Identifier
        del /a /q "%%f:Zone.Identifier"
    )
)

echo Done!
