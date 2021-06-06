import axios from "axios";
import { useEffect, useState } from "react";

export default function APIResultsTest() {
	const [results, setResults] = useState([])
	useEffect(()=>  {
		axios.get('https://api.mucitadel.io/v1/nft/listnfts?page=1&per_page=100').then(res => setResults(res.data.data.data))
	}, [])
	return (<div className="bg-mainbg">
		{JSON.stringify(Array.isArray(results))}
	</div>)
}