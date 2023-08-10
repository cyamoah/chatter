'use client';

import base from '@/utils/api';
import axios from 'axios';
import React, { useState } from 'react';

type ChatInput = {
	token: string;
	instance: string;
	message: string;
	url: string;
};
const defaultChatInput: ChatInput = {
	token: '',
	instance: '',
	message: '',
	url: '',
};

export default function Chat() {
	const [data, setdata] = useState(defaultChatInput);
	const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setdata((prev) => ({ ...prev, [name]: value }));
	};

	// const hanndler = <P extends keyof ChatInput>(name: P, value: ChatInput[P]) => {};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { data: data1 } = await base.post(
				'crm/people/',
				{
					message: data.message,
				},
				{
					url: data.url,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						Authorization: `Bearer ${data.token}`,
						Instance: data.instance,
					},
				}
			);
			console.log(data1);
		} catch (error) {
			alert('An error occurred');
		}
	};

	return (
		<form style={{ padding: '1rem' }} onSubmit={handleSubmit}>
			<h1>Chat</h1>
			<div style={{ display: 'flex', gap: '5rem' }}>
				<input style={{ flex: 1, padding: '1rem' }} placeholder='Token' name='token' value={data?.token} onChange={handleChange} />
				<input style={{ flex: 1, padding: '1rem' }} placeholder='Instance' name='instance' value={data?.instance} onChange={handleChange} />
				<input style={{ flex: 1, padding: '1rem' }} placeholder='URL' name='url' value={data?.url} onChange={handleChange} />
			</div>
			<hr style={{ marginBottom: '1rem', marginTop: '1rem' }} />
			<textarea
				style={{ width: '400px', height: '200px', padding: '1rem' }}
				placeholder='Message'
				name='message'
				value={data?.message}
				onChange={handleChange}
			/>
			<button style={{ display: 'block', marginTop: '1rem', padding: '1rem' }}>Send</button>
		</form>
	);
}
