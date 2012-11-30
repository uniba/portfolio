
SRC = $(wildcard component/*/*.js)
HTML = $(wildcard component/*/*.html)
TEMPLATES = $(HTML:.html=.js)

build: components $(SRC) $(TEMPLATES)
	@./node_modules/.bin/component build

components: component.json
	@./node_modules/.bin/component install

%.js: %.html
	@./node_modules/.bin/component convert $<

clean:
	rm -fr build components $(TEMPLATES)

.PHONY: clean