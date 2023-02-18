# Combine all PDF files in current directory intAo a PDF
gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=$1 *.pdf

