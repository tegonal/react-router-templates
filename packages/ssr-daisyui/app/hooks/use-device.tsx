import { useEffect, useState } from 'react'

interface DeviceInfo {
	isIOS: boolean
	isAndroid: boolean
	isMobile: boolean
}

export function useDevice(): DeviceInfo {
	const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
		isIOS: false,
		isAndroid: false,
		isMobile: false,
	})

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userAgent = window.navigator.userAgent.toLowerCase()

			// iOS detection
			const isIOS =
				/iphone|ipad|ipod/.test(userAgent) ||
				(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

			// Android detection
			const isAndroid = /android/.test(userAgent)

			// Combined mobile detection
			const isMobile = isIOS || isAndroid

			setDeviceInfo({ isIOS, isAndroid, isMobile })
		}
	}, [])

	return deviceInfo
}
