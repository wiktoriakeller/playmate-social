using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Dtos;
using Playmate.Social.Application.Games.Commands;
using Playmate.Social.Application.Games.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Games.Handlers;

public class RegisterGameCommandHandler : IHandlerWrapper<RegisterGameCommand, RegisterGameResponse>
{
    private readonly IGamesRepository _gamesRepository;
    private readonly IFileStorageService _fileStorageService;
    private readonly IMapper _mapper;

    private const string GameNameShouldBeUnique = "Game name should be unique";

    public RegisterGameCommandHandler(
        IGamesRepository gamesRepository,
        IFileStorageService fileStorageService,
        IMapper mapper)
    {
        _gamesRepository = gamesRepository;
        _fileStorageService = fileStorageService;
        _mapper = mapper;
    }

    public async Task<Response<RegisterGameResponse>> Handle(RegisterGameCommand request, CancellationToken cancellationToken)
    {
        var gameByName = await _gamesRepository.FirstOrDefaultAsync(x => x.Name == request.Name);
        if (gameByName is not null)
        {
            return ResponseResult.ValidationError<RegisterGameResponse>(GameNameShouldBeUnique);
        }

        var fileMetadata = request.FileMetadata;
        var game = _mapper.Map<Game>(request);

        if (fileMetadata is not null)
        {
            var newGameImageName = $"gameavatars/{game.Name}.jpg";
            var newGameImageUrl = await _fileStorageService.UploadGameAvatarAsync(new FileDto
            {
                Content = fileMetadata.Content,
                Name = newGameImageName
            });

            game.ImageUrl = newGameImageUrl;
            game.ImageName = newGameImageName;
        }

        var createdGame = await _gamesRepository.AddAsync(game);
        return ResponseResult.Created(new RegisterGameResponse(createdGame.Id));
    }
}
