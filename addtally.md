
Tally Form:
Embed code
Paste this HTML code snippet on the page where you want the embed to appear.
<iframe data-tally-src="https://tally.so/embed/w7EY0R?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="364" frameborder="0" marginheight="0" marginwidth="0" title="MedicalProviderLeads"></iframe>
<script>var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}</script>
Alternatively, simply paste this embed link in the editor of a no-code tool (Notion, Ghost, Canva, etc). To enable dynamic height, you will also need to include the script tag in the <head> section of your website.
https://tally.so/embed/w7EY0R?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1
<script async src="https://tally.so/widgets/embed.js"></script>
Save website page and query parameters
Your website's page and all query parameters will be automatically forwarded to the Tally form and could be saved using hidden fields. For example, if your page's URL looks like the one below and you have hidden fields for originPage, ref and email, you will see originPage=/register, ref=downloads and email=alice@example.com in your form submissions. This is enabled only if you use the HTML snippet or JavaScript.
https://company.com/register?ref=downloads&email=alice@example.com
Use JavaScript
Take a look at the instructions below and share them with your developers.
// Include the Tally widget script in the <head> section of your page
<script src="https://tally.so/widgets/embed.js"></script>

// Add the embed in your HTML
<iframe data-tally-src="https://tally.so/embed/w7EY0R?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="364" frameborder="0" marginheight="0" marginwidth="0" title="MedicalProviderLeads"></iframe>

// Load all embeds on the page
Tally.loadEmbeds();