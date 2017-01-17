<div id="disqus_thread"></div>
  <script>
    (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = '//affirmation.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  </script>
/**
  Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
**/

/**

*** this.page.title ***

Tells the Disqus service the title of the current page. This is used when creating the thread on Disqus for the first time. If undefined, Disqus will use the <title> attribute of the page. If that attribute could not be used, Disqus will use the URL of the page.

 *** this.page.category_id ***

Tells the Disqus service the category to be used for the current page. This is used when creating the thread on Disqus for the first time.

Categories are primarily used with our API for results filtering; categories are not used for moderation (e.g., to filter comments by category in the moderation panel). New categories can be created with our categories API endpoints. If you try using a category ID that hasn't been created within your forum settings, you'll receive a 400 Bad Request error.

*** this.page.url ***

Tells the Disqus service the URL of the current page. If undefined, Disqus will take the window.location.href. This URL is used to look up or create a thread if this.page.identifier is undefined. In addition, this URL is always saved when a thread is being created so that Disqus knows what page a thread belongs to.

While the window.location.href is used in absence of this.page.url, we highly recommend defining this variable. If a user visits your page at the URL http://example.com/helloworld.html?123, Disqus may in fact load a different thread than if the user came from http://example.com/helloworld.html.

To make sure the right thread is always displayed, you should define on your page, using an absolute URL, this.page.url = 'http://example.com/helloworld.html';
Please note that an absolute URL is required for the this.page.url variable. Using a relative URL for this variable may prevent Disqus from loading successfully on the page.

*** this.page.identifier ***

Tells the Disqus service how to identify the current page. When the Disqus embed is loaded, the identifier is used to look up the correct thread. If this.page.identifier is undefined, the page's URL will be used. The URL can be unreliable, such as when renaming an article slug or changing domains, so we recommend using your own unique way of identifying a thread.

Be careful not to assign multiple identifiers to the same thread URL, as it will result in Identifier Conflict.

Plugins, such as Disqus for WordPress, will automatically have this defined as the id of the blog post.

**/
