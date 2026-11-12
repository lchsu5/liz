Add-Type -AssemblyName System.Drawing

# Flatten the desktop gallery at 2x its maximum display width.
$assetDirectory = Join-Path $PSScriptRoot '../src/assets'
$canvas = New-Object System.Drawing.Bitmap 2000,792
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#ECEAE3'))
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$tiles = @(
    @('1.1.jpeg',2,0,1,5,0.5),
    @('1.2.JPG',3,0,1,2,0.5),
    @('1.3.jpeg',4,0,2,3,0.65),
    @('1.4.JPG',3,2,1,3,0.5),
    @('1.5.JPEG',4,3,1,2,0.5),
    @('1.6.JPG',0,0,2,4,0.5),
    @('1.7.jpg',5,3,1,2,0.5),
    @('1.8.JPEG',2,5,2,2,0.35),
    @('psbtg.jpeg',0,4,2,3,0.5),
    @('btgboard.jpeg',4,5,2,2,0.5)
)
try {
    foreach ($tile in $tiles) {
        $photo = [System.Drawing.Image]::FromFile((Join-Path $assetDirectory $tile[0]))
        try {
            # Match browser EXIF orientation before cropping.
            if ($photo.PropertyIdList -contains 274) {
                $orientation = $photo.GetPropertyItem(274).Value[0]
                $rotation = switch ($orientation) { 2 {4} 3 {2} 4 {6} 5 {5} 6 {1} 7 {7} 8 {3} default {0} }
                $photo.RotateFlip([System.Drawing.RotateFlipType]$rotation)
            }
            $x = [single]($tile[1] * (950 / 3 + 20))
            $y = [single]($tile[2] * 116)
            $width = [single]($tile[3] * (950 / 3 + 20) - 20)
            $height = [single]($tile[4] * 116 - 20)
            $scale = [Math]::Max($width / $photo.Width, $height / $photo.Height)
            $sourceWidth = [single]($width / $scale)
            $sourceHeight = [single]($height / $scale)
            $sourceX = [single](($photo.Width - $sourceWidth) / 2)
            $sourceY = [single](($photo.Height - $sourceHeight) * $tile[5])
            $path = New-Object System.Drawing.Drawing2D.GraphicsPath
            $path.AddArc($x,$y,32,32,180,90)
            $path.AddArc(($x+$width-32),$y,32,32,270,90)
            $path.AddArc(($x+$width-32),($y+$height-32),32,32,0,90)
            $path.AddArc($x,($y+$height-32),32,32,90,90)
            $path.CloseFigure()
            $graphics.SetClip($path)
            $destination = [System.Drawing.RectangleF]::new($x,$y,$width,$height)
            $source = [System.Drawing.RectangleF]::new($sourceX,$sourceY,$sourceWidth,$sourceHeight)
            $graphics.DrawImage($photo,$destination,$source,[System.Drawing.GraphicsUnit]::Pixel)
            $graphics.ResetClip()
            $path.Dispose()
        } finally { $photo.Dispose() }
    }
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
    $parameters = New-Object System.Drawing.Imaging.EncoderParameters 1
    $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]82)
    $canvas.Save((Join-Path $assetDirectory 'community-cmu.jpg'), $codec, $parameters)
    $parameters.Dispose()
} finally {
    $graphics.Dispose()
    $canvas.Dispose()
}
