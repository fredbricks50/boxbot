<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ isset($title) ? $title.' - '.config('app.name') : config('app.name') }}</title>
    {{-- <script async src="https://www.google.com/recaptcha/api.js"></script> --}}
    {{--  Currency  --}}
    {{-- <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/robsontenorio/mary@0.44.2/libs/currency/currency.js"></script> --}}

    <link
      href="..//assets/img/utoronfavicon.png"
      rel="shortcut icon"
      type="image/x-icon"
    />
    <link
      href="../assets/img/utoronfavicon.png"
      rel="apple-touch-icon"
    />
    @vite(
        [
            'resources/css/app.css',
            'resources/css/custom.css',
            'resources/js/app.js'
        ])

    @livewireStyles

    

     <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-GMCDWSVNLE"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-GMCDWSVNLE');
  </script>

  {{-- Microsoft Clarity --}}
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rg54jtftcm");
  </script> 
</head>
<body>
    <div class="flex h-screen p-2">
        <!-- Left: Video with Rounded Corners and Quote -->
        <div class="w-1/2 hidden lg:flex items-center justify-center">
          <div class="relative w-full h-full rounded-3xl overflow-hidden">
            <div class="absolute inset-0 bg-black opacity-60"></div>
            <video autoplay muted loop playsinline poster="https://via.placeholder.com/600x800" class="w-full h-full object-cover scale-2xl">
              <source src="/videos/loginvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div class="absolute bottom-8 text-white z-10 w-full">
              <div class="flex flex-col items-center justify-center mb-4 w-full text-center">
                <h1 class="text-5xl font-bold mb-2">Profit isn’t luck. </br> It’s logic, at scale.</h1>
                <p class="text-sm mt-2">Theo Lin<br><span class="text-xs opacity-75">AI Market Analyst</span></p>
              </div>
              
            </div>
          </div>
        </div>
    
        <!-- Right: Form -->
        <div class="w-full lg:w-1/2 flex items-center justify-center">
          {{ $slot }}
        </div>
      </div>
    
    <x-toast />
    
   
    @livewireScripts
    @stack('scripts')

    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
</body>
</html>
