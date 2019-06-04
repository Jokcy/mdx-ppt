rm -rf dist

npm run compile

npm run build-example

cd dist

git init

git checkout -B gh-pages

git add .

git commit -m "publish"

git remote add origin git@github.com:Jokcy/mdx-ppt.git

git push origin gh-pages -f

cd ..

rm -rf dist
