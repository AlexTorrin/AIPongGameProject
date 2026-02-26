# AI Pong Game - Client-Server Architecture

A modern, production-ready Pong game implementation with:

- ✅ **Client-Server Architecture**: Separation of concerns with REST API
- ✅ **TypeScript**: Full type safety across the codebase
- ✅ **SOLID Principles**: Clean, maintainable, extensible code
- ✅ **Unit Tests**: Comprehensive test coverage with Jest
- ✅ **Zod Validation**: Runtime schema validation for type safety
- ✅ **Monorepo**: Shared types and validators with Yarn Workspaces
- ✅ **Error Handling**: Consistent error handling across client and server

## Project Structure

```
AIPongGameProject/
├── shared/              # Shared types and validators
├── client/             # Client-side game and UI
├── server/             # Server-side game logic and API
└── root configuration files
```

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Installation

```bash
git clone https://github.com/AlexTorrin/AIPongGameProject.git
cd AIPongGameProject
npm install
```

### Development

```bash
# Terminal 1 - Server
npm run server:dev

# Terminal 2 - Client
npm run client:dev
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Building

```bash
npm run build
```

## Architecture Overview

### Client-Server Flow

```
┌─────────────┐                    ┌──────────────┐
│   Browser   │ <──── HTTP/REST ──> │    Server    │
│             │                      │              │
│ Game Logic  │                      │ Game Rules   │
│ Rendering   │                      │ State Mgmt   │
│ Input       │                      │ Validation   │
└─────────────┘                    └──────────────┘
```

### Key Services

**Client:**
- `GameApiClient` - HTTP communication with server
- `GameStore` - Client-side state management
- `GameService` - Business logic coordinator

**Server:**
- `GameSessionService` - Session management
- Routes - REST API endpoints
- Middleware - Validation and error handling

## API Endpoints

### Games

- `POST /api/games/start` - Start a new game
- `GET /api/games/:sessionId/state` - Get game state
- `POST /api/games/:sessionId/update` - Update game state
- `POST /api/games/:sessionId/end` - End game

### Players

- `GET /api/players/:playerId/stats` - Get player statistics
- `PUT /api/players/:playerId` - Update player profile

## Validation

All data is validated using **Zod** schemas:

```typescript
// Shared validators
import {
  GameConfigSchema,
  GameStateSchema,
  GameSnapshotSchema,
} from '@pong/shared';

// Validate data
const config = GameConfigSchema.parse(data);
```

## Testing

### Test Structure

```
shared/src/__tests__/        # Shared type tests
server/src/__tests__/        # Server logic tests
client/src/__tests__/        # Client logic tests
```

### Running Tests

```bash
# All tests
npm test

# Specific workspace
npm test -- --testPathPattern=server

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

## SOLID Principles

- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes can replace base types
- **I**nterface Segregation: Clients depend only on needed interfaces
- **D**ependency Inversion: Depend on abstractions, not implementations

## Future Enhancements

- [ ] WebSocket support for real-time gameplay
- [ ] Database integration (MongoDB)
- [ ] Player authentication and profiles
- [ ] Multiplayer support
- [ ] Leaderboards
- [ ] Advanced AI strategies
- [ ] Game statistics and analytics
- [ ] Docker containerization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Author

AlexTorrin

## Acknowledgments

- TypeScript community
- Express.js documentation
- Zod validation library