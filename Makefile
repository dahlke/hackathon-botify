.PHONY: venv
venv: venv/bin/activate
venv/bin/activate: requirements.txt
	test -d venv || virtualenv venv
	touch venv/bin/activate

.PHONY: pip
pip: venv
	. venv/bin/activate; pip install -r requirements.txt

.PHONY: npm
npm:
	npm install

.PHONY: deps
deps: venv npm pip

.PHONY: watch
watch:
	node node_modules/gulp/bin/gulp.js watch

.PHONY: js
js:
	node node_modules/gulp/bin/gulp.js js

.PHONY: less
less:
	node node_modules/gulp/bin/gulp.js less

.PHONY: web
web:
	node node_modules/gulp/bin/gulp.js build

.PHONY: lint
lint:
	node node_modules/gulp/bin/gulp.js lint

.PHONY: runserver
runserver: venv
	. venv/bin/activate; python server.py
