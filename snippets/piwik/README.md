Piwik snippet
=============
Add [Piwik](http://piwik.org) statistics to website or blog.

How do I install this?
----------------------
1. Download and install [Yellow](https://github.com/markseu/yellowcms/).  
2. Download and install [Piwik](http://piwik.org/).  
4. Use the snippet on your website, edit templates in your system/templates folder.

To uninstall delete the snippet and remove it from templates.

How to enable statistics?
-------------------------
Add Piwik snippet to templates: `$yellow->snippet("piwik", SITEID, SERVERNAME)`.  
SITEID is the ID of your website, you can find it in the Piwik dashboard.  
SERVERNAME is optional, it's the server name of your Piwik installation.

Example
-------
Website template with statistics:

    <?php $yellow->snippet("header") ?>
    <?php $yellow->snippet("sitename") ?>
    <?php $yellow->snippet("navigation") ?>
    <?php $yellow->snippet("content") ?>
    <?php $yellow->snippet("piwik", "annasdesign") ?>
    <?php $yellow->snippet("footer") ?>

Blog template with statistics:

    <?php $yellow->snippet("header") ?>
    <?php $yellow->snippet("sitename") ?>
    <?php $yellow->snippet("navigation") ?>
    <div class="content blog">
    ...
    </div>
    <?php $yellow->snippet("piwik", "annasdesign") ?>
    <?php $yellow->snippet("footer") ?>