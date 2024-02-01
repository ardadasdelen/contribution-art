export GIT_AUTHOR_NAME="aarda"
export GIT_AUTHOR_EMAIL="aarda@duck.com"
export GIT_COMMITTER_NAME="ardadasdelen"
export GIT_COMMITTER_EMAIL="aarda@duck.com"

touch file.txt

declare -A pattern
pattern["2024-01-01"]="1"
pattern["2024-01-02"]="2"
pattern["2024-01-03"]="3"

for date in "${!pattern[@]}"; do
  for ((i=0; i<${pattern[$date]}; i++)); do
    echo "$date: Commit $i" >> file.txt  
    GIT_AUTHOR_DATE="$date 12:00:00" GIT_COMMITTER_DATE="$date 12:00:00" git add file.txt
    GIT_AUTHOR_DATE="$date 12:00:00" GIT_COMMITTER_DATE="$date 12:00:00" git commit -m "Real commit on $date - $i"
  done
done

git push origin main
