# preview window: print lines from startLine to endLine from filePath

show_code_preview () {
    sed -n "${startLine},${endLine}p" $filePath
}
