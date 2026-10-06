$ErrorActionPreference = 'Stop'
$cities = @(
  @('jaffna','Jaffna'), @('mannar','Mannar, Sri Lanka'), @('trincomalee','Trincomalee'),
  @('anuradhapura','Anuradhapura'), @('kalpitiya','Kalpitiya'), @('pasikuda','Pasikudah'),
  @('batticaloa','Batticaloa'), @('chilaw','Munneswaram temple'), @('negombo','Negombo'),
  @('colombo','Colombo'), @('kandy','Kandy'), @('nuwara-eliya','Nuwara Eliya'),
  @('haputale','Haputale'), @('arugam-bay','Arugam Bay'), @('yala','Yala National Park'),
  @('bentota','Bentota'), @('hikkaduwa','Hikkaduwa'), @('galle','Galle Fort'),
  @('tangalle','Hummanaya'), @('hambantota','Hambantota')
)
$destination = Join-Path $PSScriptRoot '../tmp/city-photos'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
$results = $cities | ForEach-Object -Parallel {
  $entry = $_
  $id = $entry[0]
  try {
    $summaryUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + [uri]::EscapeDataString($entry[1])
    $summary = Invoke-RestMethod -Uri $summaryUrl -MaximumRetryCount 3 -RetryIntervalSec 3
    if (!$summary.originalimage.source) { throw 'No city image' }
    $original = $summary.originalimage.source
    $photo = $summary.thumbnail.source -replace '/\d+px-', '/960px-'
    $path = Join-Path $using:destination ($id + '.jpg')
    if (!(Test-Path -LiteralPath $path)) { try { Invoke-WebRequest -Uri $photo -OutFile $path } catch { Invoke-WebRequest -Uri $original -OutFile $path } }
    $file = [uri]::UnescapeDataString((([uri]$original).AbsolutePath -split '/')[-1])
    $file = $file -replace '^\d+px-', ''
    $api = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&redirects=1&prop=imageinfo&iiprop=extmetadata&titles=' + [uri]::EscapeDataString('File:' + $file)
    $metadata = Invoke-RestMethod -Uri $api -MaximumRetryCount 3 -RetryIntervalSec 3
    $page = $metadata.query.pages.PSObject.Properties.Value | Select-Object -First 1
    $info = $page.imageinfo[0].extmetadata
    [pscustomobject]@{ id=$id; file=$file; source=$original; page=$summary.content_urls.desktop.page; author=$info.Artist.value; license=$info.LicenseShortName.value; licenseUrl=$info.LicenseUrl.value; error=$null }
  } catch {
    [pscustomobject]@{ id=$id; error=$_.Exception.Message }
  }
} -ThrottleLimit 1
$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $destination 'sources.json')
$results | Select-Object id,license,error | Format-Table
