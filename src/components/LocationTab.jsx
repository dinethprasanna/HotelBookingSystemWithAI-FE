function LocationTab(props) {

    const handleTabClick = () => {
        props.onClick(props.name);// here onclick2 means hotellisting "getSelectedLocation" function
        // console.log(props);
    }

    if (props.selectedLocation  === props.name) {
        return (
            <div className="text-base bg-red-500 text-white border rounded px-2 py-1 cursor-pointer"
                onClick={handleTabClick}>
                {props.name}
            </div>
        );
    }
    else {
        return (
            <div className="text-base bg-gray-200 rounded px-2 py-1 cursor-pointer"
                onClick={handleTabClick}>
                {props.name}
            </div>
        );
    }

    

}

export default LocationTab;