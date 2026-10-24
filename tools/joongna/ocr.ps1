# 사진 여러 장을 Windows 글자 인식(사용자 언어 = ko)으로 2배 키워 읽어 "경로<TAB>글" 한 줄씩 낸다 — pics_check.py 가 부른다
param([string]$ListFile, [string]$OutFile)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, [Type]$t) { $task = $asTask.MakeGenericMethod($t).Invoke($null, @($op)); $task.Wait(-1) | Out-Null; $task.Result }
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if (-not $engine) { throw 'OCR 엔진 없음' }
$max = [Windows.Media.Ocr.OcrEngine]::MaxImageDimension
$out = New-Object System.Collections.Generic.List[string]
foreach ($p in Get-Content -Encoding UTF8 $ListFile) {
  if (-not $p) { continue }
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($p)) ([Windows.Storage.StorageFile])
  $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $dec = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $w = $dec.PixelWidth; $h = $dec.PixelHeight; $s = [Math]::Min(2.0, $max / [Math]::Max($w, $h))
  $tf = New-Object Windows.Graphics.Imaging.BitmapTransform
  $tf.ScaledWidth = [uint32]([Math]::Floor($w * $s)); $tf.ScaledHeight = [uint32]([Math]::Floor($h * $s))
  $bmp = Await ($dec.GetSoftwareBitmapAsync([Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8, [Windows.Graphics.Imaging.BitmapAlphaMode]::Premultiplied, $tf, [Windows.Graphics.Imaging.ExifOrientationMode]::IgnoreExifOrientation, [Windows.Graphics.Imaging.ColorManagementMode]::DoNotColorManage)) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $res = Await ($engine.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
  $txt = ($res.Lines | ForEach-Object { $_.Text }) -join ' | '
  $out.Add("$p`t$txt")
  $stream.Dispose()
}
[System.IO.File]::WriteAllLines($OutFile, $out, (New-Object System.Text.UTF8Encoding $false))
