using AutoFixture;
using Playmate.Social.Infrastructure.Identity.Entities;

namespace Playmate.Social.UnitTests.Attributes.Customization
{
    public class ApplicationUserWithoutTokenCustomization : ICustomization
    {
        public void Customize(IFixture fixture)
        {
            fixture.Customize<ApplicationUser>(transform => transform
                .Without(u => u.RefreshToken));
        }
    }
}