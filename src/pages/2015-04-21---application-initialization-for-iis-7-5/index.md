---
slug: "/application-initialization-for-iis-7-5"
date: "2015-04-21T15:00:57.000Z"
title: "Application Initialization for IIS 7.5"
featured: false
draft: false
tags: []
---

###Overview

IIS Application Initialization for IIS 7.5 enables website administrators to
improve the responsiveness of their Web sites by loading the Web applications
before the first request arrives. By proactively loading and initializing all
the dependencies such as database connections, compilation of ASP.NET code, and
loading of modules, IT Professionals can ensure their Web sites are responsive
at all times even if their Web sites use a custom request pipeline or if the
Application Pool is recycled. While an application is being initialized, IIS can
also be configured to return an alternate response such as static content as a
placeholder or "splash page" until an application has completed its
initialization tasks.

More information about Application Initialization can be found at
[IIS.net](http://www.iis.net/configreference/system.webserver/applicationinitialization)

###Install

Download the extension from
[here](http://www.iis.net/downloads/microsoft/application-initialization). Once
downloaded run the executable on the IIS server and follow the instructions,
ensuring that you restart the server at the end.

###Using Application Initialization

Unfortunately Application Initialization was not built into IIS 7.5, unlike IIS
8, so you do not get a nice GUI in IIS Manager. Without the GUI you have to
manually edit the _applicationHost.config_ which is found by default in the
_%WINDIR%\System32\inetsrv\config\\_ directory.

> When editing the _applicationHost.config_ file you **MUST** use a 64 Bit text
> editor, otherwise you end up with a ghost copy of your config file at
> _%WINDIR%\SysWOW64\inetsrv\Config\\_ and your configuration changes will not
> be used. I use notepad for editing _applicationHost.config_.

#####App Pool Changes

To set the app pool to take full advantage of application initialization you
need to make a few modifications. A sample default app pool is shown below.

```xml
<add name="DefaultAppPool" managedRuntimeVersion="v4.0" />
```

The changes you need to set the start mode of the application pool to always
running. Another change that is beneficial although not strictly needed is to
set the idle timeout of the application to 0, this will ensure that the
application will not cool down if not used for a short while (default 20
minutes).

```xml
<add name="DefaultAppPool" managedRuntimeVersion="v4.0" startMode="AlwaysRunning">
    <processModel idleTimeout="00:00:00" />
</add>
```

#####Application Changes

In addition to application initialization, you can enable the initialization
process to start whenever the application pool is started. You do so by setting
the preLoadEnabled attribute in the <application> element to "true". For this to
occur, the start mode in the <applicationPool> element must be set to
AlwaysRunning.

A default application.

```xml
<application path="/Test" applicationPool="DefaultAppPool">
    <virtualDirectory path="/" physicalPath="C:\inetpub\wwwroot\Test" />
</application>
```

A modified application.

```xml
<application path="/Test" applicationPool="DefaultAppPool" preloadEnabled="true">
    <virtualDirectory path="/" physicalPath="C:\inetpub\wwwroot\Test" />
</application>
```

#####Webconfig Changes

The final changes to get application initalization fully functioning is to make
a webconfig change to your site. The basic configuration I use is below. The
_doAppInitAfterRestart_ setting specifies that the initialization process is
initiated automatically whenever an application restart occurs.

```xml
<system.webServer>
    <applicationInitialization doAppInitAfterRestart="true">
      <add initializationPage="/" />
    </applicationInitialization>
</system.webServer>
```

###Testing Everything Works

The only way I have found to test that you have set application initialization
set correctly up is to have a copy of your application, one were you setup
application initialization and one were you do not. I then recycle both
application pools, wait a short time (maybe 60 seconds), then open your browser
developer tools and the network tab and hit the URL of your website and compare
the time taken to get the initial response.

###Using PowerShell To Speed Things Up

The steps above to setting up Application Initialization are both tedious and
erroneous and you are editing potentially live configuration files by hand, this
can lead to errors occurring and potentially breaking your websites. This is why
I have created a couple of PowerShell scripts to set the
_applicationHost.config_ settings (you still have to set the _web.config_ file
manually).

#####Web Administration Module

The Web Administration Module is a PowerShell module that contains Internet
Information Services (IIS) cmdlets that let you manage the configuration and
run-time data of IIS. More information on this module can be found on
[TechNet](https://technet.microsoft.com/en-us/library/ee790599.aspx)

#####Update Scripts

Below are a couple of PowerShell Scripts. That automate the settings that have
to be defined, as mentioned above. The scripts need to run in 64 Bit mode with
PowerShell 4.

The first script sets the application pool settings and needs at the very least
to have the name of the application pool passed as a parameter.

The second script sets the application settings and needs at the very least to
be passed the application name passed as a parameter.

<script src="https://gist.github.com/InsidersByte/dce82ff36431b56b09bb.js"></script>

###Congratulations You now know how to setup application initialization on your
IIS servers.
