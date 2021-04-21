#----------------------------------------------------------------------
# Generate reference Objection Database Models 
#----------------------------------------------------------------------

# Note: Relative path to the templates from the pgen executable in the node_modules
TEMPLATES_PATH := ../../../../../dist/templates

gen-models:
	yarn pgen ./dist/templates:objectionTs \
	--out-dir ${MODELS_DESTINATION} --clear \
	--relationNameFunctions ${TEMPLATES_PATH}/utils/relation-names.js \
	--database ${DB_NAME} \
	--user ${DB_USER} \
	--password ${DB_PASS} \
	--port ${LOCAL_DB_PORT}