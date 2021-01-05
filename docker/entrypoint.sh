#!/bin/sh

cd /etc/nginx
rm nginx.conf

set -e
export NAMESERVER=`cat /etc/resolv.conf | grep "nameserver" | awk '{print $2}' | tr '\n' ' '`
env

envsubst '
$$NAMESERVER
$$OPEN_API' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
#/etc/nginx/sbin/nginx -g "daemon off;"
nginx -g "daemon off;"
#nginx -s reload




