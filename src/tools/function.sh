RED='\033[0;31m'
Blue='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color


function linfo ()
{
	echo -e "${Blue}[info] $1 ${NC}"
}
##
function lwarn ()
{
	echo -e "${YELLOW}[warn] $1 ${NC}"
}
##
function lerror ()
{
	echo -e "${RED}[error] $1 ${NC}"
}



function check_pypkg()
{
	pkg=$1
	version=$2
	cmd_v="import pkg_resources; print(pkg_resources.get_distribution('$pkg').version)"
	cmd_pkg="import pkgutil; exit(not pkgutil.find_loader('$pkg'))"
	result=($( pip3 list | grep $pkg))
	cur_pkg=${result[0]}
	cur_ver=${result[1]}

	if [ "$cur_pkg" = "$pkg" ] ; then				

		if [ "$version" =  "$cur_ver" ]	; then

			echo -e "${Blue}$pkg $cur_ver founded ${NC} ${RED}\xE2\x9C\x94${NC}"
			return 1

		else

			lwarn "$pkg is not compatible version: require $version instead if ${result[1]} "
			return 0

		fi
	else

		echo -e "${RED} \u274c ${NC} $pkg $version ${RED} not found "

		return 0
	
	fi
}
# check package
function check_module_list_file()
{
FILE=$1
IS_OK=1
echo "Checking at $FILE"
if [ -f $FILE ] ; then
## Input is a template file	
	while read -r line
	do
		name="$line"

		a=($(echo "$name" | tr '==' '\n'))
		pkg_name=${a[0]}
		pkg_ver={a[1]}
		check_pypkg "${a[0]}" "${a[1]}" 

		if [ $? = 0  ] ; then
			
			IS_OK=0
		fi
	 
	done < "$FILE"
else
	echo "File $FILE does not exist ."
fi

if [ $IS_OK = 1  ] ; then
	linfo  "All package is installed correctly"
	return 1
else
	lerror "There are some packages not installed "
	lerror "You must install all package listed in the  $py_pkg file"

	check_pkg_status=0

	if ask "Do you want to install all requirement packages ?"; then
		info " Install package ..."

    	pip3 install -r $py_pkg
		return -1
	else
		echo "No"
		return 0
		
	fi	
fi
}

ask() {
    # https://gist.github.com/davejamesmiller/1965569
    local prompt default reply

    if [ "${2:-}" = "Y" ]; then
        prompt="Y/n"
        default=Y
    elif [ "${2:-}" = "N" ]; then
        prompt="y/N"
        default=N
    else
        prompt="y/n"
        default=
    fi

    while true; do

        # Ask the question (not using "read -p" as it uses stderr not stdout)
        echo -n "$1 [$prompt] "

        # Read the answer (use /dev/tty in case stdin is redirected from somewhere else)
        read reply </dev/tty

        # Default?
        if [ -z "$reply" ]; then
            reply=$default
        fi

        # Check if the reply is valid
        case "$reply" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
        esac

    done
}

