import { useState } from 'react'
import './App.css'

function App() {
  const [withWhom, setWithWhom] = useState('')
  const [meetingType, setMeetingType] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [showRestaurants, setShowRestaurants] = useState(false)

  const handleRecommend = () => {
    console.log('누구와 함께:', withWhom)
    console.log('어떠한 만남:', meetingType)
    setShowRestaurants(true)
  }

  const handleBack = () => {
    setShowRestaurants(false)
  }

  // 가짜 식당 데이터
  const restaurants = [
    {
      id: 1,
      name: '스시로',
      category: '일식',
      rating: 4.8,
      price: '$$$',
      distance: '0.3km',
      image: '🍣'
    },
    {
      id: 2,
      name: '파스타 하우스',
      category: '이탈리안',
      rating: 4.5,
      price: '$$',
      distance: '0.5km',
      image: '🍝'
    },
    {
      id: 3,
      name: '한우 스테이크',
      category: '한식',
      rating: 4.7,
      price: '$$$$',
      distance: '0.8km',
      image: '🥩'
    },
    {
      id: 4,
      name: '타코 벨',
      category: '멕시칸',
      rating: 4.2,
      price: '$',
      distance: '0.2km',
      image: '🌮'
    },
    {
      id: 5,
      name: '중국집',
      category: '중식',
      rating: 4.4,
      price: '$$',
      distance: '0.6km',
      image: '🥢'
    },
    {
      id: 6,
      name: '카페 드 파리',
      category: '카페',
      rating: 4.6,
      price: '$$',
      distance: '0.4km',
      image: '☕'
    }
  ]

  if (showRestaurants) {
    return (
      <div style={{ 
        width: '100vw',
        height: '100vh',
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)'
      }}>
        {/* Top Navigation Bar */}
        <div style={{
          height: '60px',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          position: 'relative',
          flexShrink: 0,
          width: '100%',
          boxSizing: 'border-box',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <button
            onClick={handleBack}
            style={{
              position: 'absolute',
              left: '20px',
              background: 'none',
              border: 'none',
              fontSize: '16px',
              color: '#007AFF',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px'
            }}
          >
            ← 뒤로
          </button>
          <h1 style={{
            fontSize: '17px',
            fontWeight: '600',
            color: '#000000',
            margin: 0
          }}>
            추천 식당
          </h1>
        </div>

        {/* Restaurant List */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '12px',
                border: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <div style={{
                fontSize: '32px',
                marginRight: '16px',
                width: '40px',
                textAlign: 'center'
              }}>
                {restaurant.image}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  {restaurant.name}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666666',
                  marginBottom: '4px'
                }}>
                  {restaurant.category} • {restaurant.price} • {restaurant.distance}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#007AFF',
                  fontWeight: '500'
                }}>
                  ⭐ {restaurant.rating}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tab Bar */}
        <div style={{
          height: '80px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: '20px',
          flexShrink: 0,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div 
            onClick={() => setActiveTab('home')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: activeTab === 'home' ? '#f0f8ff' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: activeTab === 'home' ? '#007AFF' : '#8e8e93',
              borderRadius: '4px',
              marginBottom: '4px',
              transition: 'all 0.2s ease'
            }}></div>
            <span style={{
              fontSize: '12px',
              color: activeTab === 'home' ? '#007AFF' : '#8e8e93',
              fontWeight: activeTab === 'home' ? '600' : '400',
              transition: 'all 0.2s ease'
            }}>
              홈
            </span>
          </div>
          
          <div 
            onClick={() => setActiveTab('search')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: activeTab === 'search' ? '#f0f8ff' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: activeTab === 'search' ? '#007AFF' : '#8e8e93',
              borderRadius: '4px',
              marginBottom: '4px',
              transition: 'all 0.2s ease'
            }}></div>
            <span style={{
              fontSize: '12px',
              color: activeTab === 'search' ? '#007AFF' : '#8e8e93',
              fontWeight: activeTab === 'search' ? '600' : '400',
              transition: 'all 0.2s ease'
            }}>
              검색
            </span>
          </div>
          
          <div 
            onClick={() => setActiveTab('favorites')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: activeTab === 'favorites' ? '#f0f8ff' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: activeTab === 'favorites' ? '#007AFF' : '#8e8e93',
              borderRadius: '4px',
              marginBottom: '4px',
              transition: 'all 0.2s ease'
            }}></div>
            <span style={{
              fontSize: '12px',
              color: activeTab === 'favorites' ? '#007AFF' : '#8e8e93',
              fontWeight: activeTab === 'favorites' ? '600' : '400',
              transition: 'all 0.2s ease'
            }}>
              즐겨찾기
            </span>
          </div>
          
          <div 
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: activeTab === 'profile' ? '#f0f8ff' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: activeTab === 'profile' ? '#007AFF' : '#8e8e93',
              borderRadius: '4px',
              marginBottom: '4px',
              transition: 'all 0.2s ease'
            }}></div>
            <span style={{
              fontSize: '12px',
              color: activeTab === 'profile' ? '#007AFF' : '#8e8e93',
              fontWeight: activeTab === 'profile' ? '600' : '400',
              transition: 'all 0.2s ease'
            }}>
              프로필
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      width: '100vw',
      height: '100vh',
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxWidth: '500px',
      margin: '0 auto',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        height: '60px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'relative',
        flexShrink: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ width: '24px' }}></div>
        <h1 style={{
          fontSize: '17px',
          fontWeight: '600',
          color: '#000000',
          margin: 0
        }}>
          만남 추천
        </h1>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        padding: '20px',
        overflow: 'auto',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            marginBottom: '16px', 
            fontSize: '18px', 
            fontWeight: '600',
            color: '#000000'
          }}>
            누구와 함께 할 건가요?
          </h2>
          <input
            type="text"
            value={withWhom}
            onChange={e => setWithWhom(e.target.value)}
            placeholder="예: 친구, 가족, 동료..."
            style={{ 
              width: '100%', 
              padding: '16px', 
              fontSize: '16px', 
              borderRadius: '8px', 
              border: '1px solid #e0e0e0',
              backgroundColor: '#fafafa',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#007AFF';
              e.target.style.backgroundColor = '#ffffff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.backgroundColor = '#fafafa';
            }}
          />
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            marginBottom: '16px', 
            fontSize: '18px', 
            fontWeight: '600',
            color: '#000000'
          }}>
            어떠한 만남인가요?
          </h2>
          <input
            type="text"
            value={meetingType}
            onChange={e => setMeetingType(e.target.value)}
            placeholder="예: 점심, 회의, 데이트..."
            style={{ 
              width: '100%', 
              padding: '16px', 
              fontSize: '16px', 
              borderRadius: '8px', 
              border: '1px solid #e0e0e0',
              backgroundColor: '#fafafa',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#007AFF';
              e.target.style.backgroundColor = '#ffffff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.backgroundColor = '#fafafa';
            }}
          />
        </div>

        <button
          onClick={handleRecommend}
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '17px',
            borderRadius: '12px',
            background: '#007AFF',
            color: '#ffffff',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          추천받기
        </button>
      </div>

      {/* Bottom Tab Bar */}
      <div style={{
        height: '80px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: '20px',
        flexShrink: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div 
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: activeTab === 'home' ? '#f0f8ff' : 'transparent',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: activeTab === 'home' ? '#007AFF' : '#8e8e93',
            borderRadius: '4px',
            marginBottom: '4px',
            transition: 'all 0.2s ease'
          }}></div>
          <span style={{
            fontSize: '12px',
            color: activeTab === 'home' ? '#007AFF' : '#8e8e93',
            fontWeight: activeTab === 'home' ? '600' : '400',
            transition: 'all 0.2s ease'
          }}>
            홈
          </span>
        </div>
        
        <div 
          onClick={() => setActiveTab('search')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: activeTab === 'search' ? '#f0f8ff' : 'transparent',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: activeTab === 'search' ? '#007AFF' : '#8e8e93',
            borderRadius: '4px',
            marginBottom: '4px',
            transition: 'all 0.2s ease'
          }}></div>
          <span style={{
            fontSize: '12px',
            color: activeTab === 'search' ? '#007AFF' : '#8e8e93',
            fontWeight: activeTab === 'search' ? '600' : '400',
            transition: 'all 0.2s ease'
          }}>
            검색
          </span>
        </div>
        
        <div 
          onClick={() => setActiveTab('favorites')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: activeTab === 'favorites' ? '#f0f8ff' : 'transparent',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: activeTab === 'favorites' ? '#007AFF' : '#8e8e93',
            borderRadius: '4px',
            marginBottom: '4px',
            transition: 'all 0.2s ease'
          }}></div>
          <span style={{
            fontSize: '12px',
            color: activeTab === 'favorites' ? '#007AFF' : '#8e8e93',
            fontWeight: activeTab === 'favorites' ? '600' : '400',
            transition: 'all 0.2s ease'
          }}>
            즐겨찾기
          </span>
        </div>
        
        <div 
          onClick={() => setActiveTab('profile')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: activeTab === 'profile' ? '#f0f8ff' : 'transparent',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: activeTab === 'profile' ? '#007AFF' : '#8e8e93',
            borderRadius: '4px',
            marginBottom: '4px',
            transition: 'all 0.2s ease'
          }}></div>
          <span style={{
            fontSize: '12px',
            color: activeTab === 'profile' ? '#007AFF' : '#8e8e93',
            fontWeight: activeTab === 'profile' ? '600' : '400',
            transition: 'all 0.2s ease'
          }}>
            프로필
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
