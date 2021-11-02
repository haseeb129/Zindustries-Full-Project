import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../AxiosInstance';

class TextEditor extends Component {
	state = { emailContent: '<p>This is the initial content of the editor</p>' };

	handleEditorChange(e) {
		console.log(e.target.getContent());
	}

	handleEditorChange2 = (content, editor) => {
		console.log('Content was updated:', content);
		this.setState({ emailContent: content });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('State', this.state);
		axios
			.post('auth/SentEmailToAll', { emailContent: this.state.emailContent })
			.then((res) => {
				this.setState({ emailContent: '<p>Email sent successfully!!!!</p>' });
				console.log('Email Sent Success');
			})
			.catch((err) => {
				this.setState({ emailContent: '<p>Email not sent.!!!! There is some error</p>' });
				console.log('Email Sent Failed');
			});
	};
	render() {
		return (
			<div>
				<Editor
					initialValue={this.state.emailContent}
					init={{
						height: 500,
						menubar: false,
						plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],

						toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' + 'bullist numlist outdent indent | link image | print preview media fullpage | ' + 'forecolor backcolor emoticons | help',
					}}
					onEditorChange={this.handleEditorChange2}
				/>
				<div style={{ paddingTop: '2rem' }}>
					<button
						onClick={this.handleSubmit}
						style={{
							height: '40px',
							width: '180px',
							backgroundColor: 'white',
							borderRadius: '10px',
							boxShadow: '0px 1px 0px 1px grey',
							fontWeight: '600',
							fontSize: '14px',
						}}>
						Sent Email to everyone
					</button>
				</div>
			</div>
		);
	}
}

export default TextEditor;
