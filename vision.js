submitToGoogle = async () => {
	try {
		this.setState({ uploading: true });
		let { image } = this.state;
		let body = JSON.stringify({
			requests: [
				{
					features: [
						//{ type: 'LABEL_DETECTION', maxResults: 10 },
						//{ type: 'LANDMARK_DETECTION', maxResults: 5 },
						//{ type: 'FACE_DETECTION', maxResults: 5 },
						//{ type: 'LOGO_DETECTION', maxResults: 5 },
						{ type: 'TEXT_DETECTION', maxResults: 5 },
						//{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
						//{ type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
						//{ type: 'IMAGE_PROPERTIES', maxResults: 5 },
						//{ type: 'CROP_HINTS', maxResults: 5 },
						//{ type: 'WEB_DETECTION', maxResults: 5 }
					],
					image: {
						source: {
							imageUri: image
						}
					}
				}
			]
		});
		let response = await fetch(
			'https://vision.googleapis.com/v1/images:annotate?key=' +
				Environment[a4435759cbbfb4df1856642cd3a3c2e99932aff6],
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: body
			}
		);
		let responseJson = await response.json();
		console.log(responseJson);
		this.setState({
			googleResponse: responseJson,
			uploading: false
		});
	} catch (error) {
		console.log(error);
	}
};
