# express_todo

This is the first of what will be at least a few full stack node.js application built using express. With this project I have made yet another todo list app, just for the sake of gearing myself up for something else that may prove to be more interesting.


## 1 - Setup

I do not aim to publish this to npm, so to use this I would clone it down with git, and use npm to install the dependencies. There is then the conf.yaml file that is of interest, when it comes to the current state of soft coded settings for the app.

### 1.1 - Clone it down from git, and install

Use git from the command line to clone down this repo, then use npm to install the dependences for this app.

```
$ git clone https://github.com/dustinpfister/express_todo
$ cd express_todo
$ npm install
```

### 1.2 - The conf.yaml file

In this project I have experimented with using yaml as a way to define a config file. It seems like it is a better alternative then json for such a task, purely just for the reason that it supports comments.

```yaml
# The port to listen on
port: 8080
 
# The current theme to use
theme: landscape
```