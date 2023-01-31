#!/usr/bin/env bash
set -euxo pipefail
cd $(dirname $0)

rm -rf ./dist/*

npx tsc

gcloud functions deploy sharepoint-accessor \
--gen2 \
--entry-point=main \
--source=./dist \
--region=asia-northeast2 \
--runtime=nodejs16 \
--memory=128Mi \
--env-vars-file=env.yaml \
--trigger-http \
--allow-unauthenticated